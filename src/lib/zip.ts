const encoder = new TextEncoder();

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let index = 0; index < 256; index += 1) {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) {
      value = (value & 1) !== 0 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }
    table[index] = value >>> 0;
  }
  return table;
})();

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function concatBytes(chunks: Uint8Array[]): Uint8Array {
  const length = chunks.reduce((total, chunk) => total + chunk.length, 0);
  const output = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    output.set(chunk, offset);
    offset += chunk.length;
  }
  return output;
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const copy = new Uint8Array(bytes.length);
  copy.set(bytes);
  return copy.buffer;
}

function dosDateTime(date: Date): { date: number; time: number } {
  const year = Math.max(1980, Math.min(2107, date.getFullYear()));
  return {
    date:
      ((year - 1980) << 9) |
      ((date.getMonth() + 1) << 5) |
      date.getDate(),
    time:
      (date.getHours() << 11) |
      (date.getMinutes() << 5) |
      Math.floor(date.getSeconds() / 2),
  };
}

function writeLocalHeader(
  name: Uint8Array,
  data: Uint8Array,
  checksum: number,
  date: number,
  time: number,
): Uint8Array {
  const header = new Uint8Array(30);
  const view = new DataView(header.buffer);
  view.setUint32(0, 0x04034b50, true);
  view.setUint16(4, 20, true);
  view.setUint16(6, 0x0800, true);
  view.setUint16(8, 0, true);
  view.setUint16(10, time, true);
  view.setUint16(12, date, true);
  view.setUint32(14, checksum, true);
  view.setUint32(18, data.length, true);
  view.setUint32(22, data.length, true);
  view.setUint16(26, name.length, true);
  view.setUint16(28, 0, true);
  return concatBytes([header, name, data]);
}

function writeCentralHeader(
  name: Uint8Array,
  data: Uint8Array,
  checksum: number,
  date: number,
  time: number,
  localOffset: number,
): Uint8Array {
  const header = new Uint8Array(46);
  const view = new DataView(header.buffer);
  view.setUint32(0, 0x02014b50, true);
  view.setUint16(4, 20, true);
  view.setUint16(6, 20, true);
  view.setUint16(8, 0x0800, true);
  view.setUint16(10, 0, true);
  view.setUint16(12, time, true);
  view.setUint16(14, date, true);
  view.setUint32(16, checksum, true);
  view.setUint32(20, data.length, true);
  view.setUint32(24, data.length, true);
  view.setUint16(28, name.length, true);
  view.setUint16(30, 0, true);
  view.setUint16(32, 0, true);
  view.setUint16(34, 0, true);
  view.setUint16(36, 0, true);
  view.setUint32(38, 0, true);
  view.setUint32(42, localOffset, true);
  return concatBytes([header, name]);
}

export function createZipBlob(files: Record<string, string>): Blob {
  const entries = Object.entries(files);
  if (entries.length === 0) {
    throw new Error("Cannot create an empty OKF bundle.");
  }
  if (entries.length > 0xffff) {
    throw new Error("The bundle contains too many files for this ZIP writer.");
  }

  const timestamp = dosDateTime(new Date());
  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  let localOffset = 0;

  for (const [path, content] of entries) {
    if (
      path.length === 0 ||
      path.startsWith("/") ||
      path.split("/").some((segment) => segment === ".." || segment === "")
    ) {
      throw new Error("Bundle file paths must be relative and cannot traverse directories.");
    }

    const name = encoder.encode(path);
    const data = encoder.encode(content);
    if (name.length > 0xffff || data.length > 0xffffffff) {
      throw new Error("A bundle path or file exceeds the supported ZIP size.");
    }

    const checksum = crc32(data);
    const local = writeLocalHeader(
      name,
      data,
      checksum,
      timestamp.date,
      timestamp.time,
    );
    const central = writeCentralHeader(
      name,
      data,
      checksum,
      timestamp.date,
      timestamp.time,
      localOffset,
    );

    localParts.push(local);
    centralParts.push(central);
    localOffset += local.length;
  }

  const centralDirectory = concatBytes(centralParts);
  const end = new Uint8Array(22);
  const endView = new DataView(end.buffer);
  endView.setUint32(0, 0x06054b50, true);
  endView.setUint16(4, 0, true);
  endView.setUint16(6, 0, true);
  endView.setUint16(8, entries.length, true);
  endView.setUint16(10, entries.length, true);
  endView.setUint32(12, centralDirectory.length, true);
  endView.setUint32(16, localOffset, true);
  endView.setUint16(20, 0, true);

  const parts = [...localParts, centralDirectory, end].map(toArrayBuffer);
  return new Blob(parts, { type: "application/zip" });
}
