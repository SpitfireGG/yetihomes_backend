"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.7.0",
    "engineVersion": "75cbdc1eb7150937890ad5465d861175c6624711",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = \"prisma-client\"\n  output   = \"../generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel CompanyInfo {\n  id           String  @id() @default(uuid()) @db.VarChar(36)\n  name         String  @db.Text\n  description  String  @db.Text\n  mission      String? @db.Text\n  vision       String? @db.Text\n  contactEmail String?\n  phone        String?\n  address      String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @default(now())\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"CompanyInfo\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"mission\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"vision\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"contactEmail\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"phone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"address\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"CompanyInfo.findUnique\",\"CompanyInfo.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"CompanyInfo.findFirst\",\"CompanyInfo.findFirstOrThrow\",\"CompanyInfo.findMany\",\"data\",\"CompanyInfo.createOne\",\"CompanyInfo.createMany\",\"CompanyInfo.createManyAndReturn\",\"CompanyInfo.updateOne\",\"CompanyInfo.updateMany\",\"CompanyInfo.updateManyAndReturn\",\"create\",\"update\",\"CompanyInfo.upsertOne\",\"CompanyInfo.deleteOne\",\"CompanyInfo.deleteMany\",\"having\",\"_count\",\"_min\",\"_max\",\"CompanyInfo.groupBy\",\"CompanyInfo.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"name\",\"description\",\"mission\",\"vision\",\"contactEmail\",\"phone\",\"address\",\"createdAt\",\"updatedAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"set\"]"),
    graph: "MAkQDRoAACYAMBsAAAQAEBwAACYAMB0BAAAAAR4BACcAIR8BACcAISABACgAISEBACgAISIBACgAISMBACgAISQBACgAISVAACkAISZAACkAIQEAAAABACABAAAAAQAgDRoAACYAMBsAAAQAEBwAACYAMB0BACcAIR4BACcAIR8BACcAISABACgAISEBACgAISIBACgAISMBACgAISQBACgAISVAACkAISZAACkAIQUgAAAqACAhAAAqACAiAAAqACAjAAAqACAkAAAqACADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACAKHQEAAAABHgEAAAABHwEAAAABIAEAAAABIQEAAAABIgEAAAABIwEAAAABJAEAAAABJUAAAAABJkAAAAABAQgAAAkAIAodAQAAAAEeAQAAAAEfAQAAAAEgAQAAAAEhAQAAAAEiAQAAAAEjAQAAAAEkAQAAAAElQAAAAAEmQAAAAAEBCAAACwAwAQgAAAsAMAodAQAuACEeAQAuACEfAQAuACEgAQAvACEhAQAvACEiAQAvACEjAQAvACEkAQAvACElQAAwACEmQAAwACECAAAAAQAgCAAADgAgCh0BAC4AIR4BAC4AIR8BAC4AISABAC8AISEBAC8AISIBAC8AISMBAC8AISQBAC8AISVAADAAISZAADAAIQIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgCBUAACsAIBYAAC0AIBcAACwAICAAACoAICEAACoAICIAACoAICMAACoAICQAACoAIA0aAAAaADAbAAAXABAcAAAaADAdAQAbACEeAQAbACEfAQAbACEgAQAcACEhAQAcACEiAQAcACEjAQAcACEkAQAcACElQAAdACEmQAAdACEDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIA0aAAAaADAbAAAXABAcAAAaADAdAQAbACEeAQAbACEfAQAbACEgAQAcACEhAQAcACEiAQAcACEjAQAcACEkAQAcACElQAAdACEmQAAdACEOFQAAHwAgFgAAJQAgFwAAJQAgJwEAAAABKAEAAAAEKQEAAAAEKgEAAAABKwEAAAABLAEAAAABLQEAAAABLgEAJAAhLwEAAAABMAEAAAABMQEAAAABDhUAACIAIBYAACMAIBcAACMAICcBAAAAASgBAAAABSkBAAAABSoBAAAAASsBAAAAASwBAAAAAS0BAAAAAS4BACEAIS8BAAAAATABAAAAATEBAAAAAQsVAAAfACAWAAAgACAXAAAgACAnQAAAAAEoQAAAAAQpQAAAAAQqQAAAAAErQAAAAAEsQAAAAAEtQAAAAAEuQAAeACELFQAAHwAgFgAAIAAgFwAAIAAgJ0AAAAABKEAAAAAEKUAAAAAEKkAAAAABK0AAAAABLEAAAAABLUAAAAABLkAAHgAhCCcCAAAAASgCAAAABCkCAAAABCoCAAAAASsCAAAAASwCAAAAAS0CAAAAAS4CAB8AIQgnQAAAAAEoQAAAAAQpQAAAAAQqQAAAAAErQAAAAAEsQAAAAAEtQAAAAAEuQAAgACEOFQAAIgAgFgAAIwAgFwAAIwAgJwEAAAABKAEAAAAFKQEAAAAFKgEAAAABKwEAAAABLAEAAAABLQEAAAABLgEAIQAhLwEAAAABMAEAAAABMQEAAAABCCcCAAAAASgCAAAABSkCAAAABSoCAAAAASsCAAAAASwCAAAAAS0CAAAAAS4CACIAIQsnAQAAAAEoAQAAAAUpAQAAAAUqAQAAAAErAQAAAAEsAQAAAAEtAQAAAAEuAQAjACEvAQAAAAEwAQAAAAExAQAAAAEOFQAAHwAgFgAAJQAgFwAAJQAgJwEAAAABKAEAAAAEKQEAAAAEKgEAAAABKwEAAAABLAEAAAABLQEAAAABLgEAJAAhLwEAAAABMAEAAAABMQEAAAABCycBAAAAASgBAAAABCkBAAAABCoBAAAAASsBAAAAASwBAAAAAS0BAAAAAS4BACUAIS8BAAAAATABAAAAATEBAAAAAQ0aAAAmADAbAAAEABAcAAAmADAdAQAnACEeAQAnACEfAQAnACEgAQAoACEhAQAoACEiAQAoACEjAQAoACEkAQAoACElQAApACEmQAApACELJwEAAAABKAEAAAAEKQEAAAAEKgEAAAABKwEAAAABLAEAAAABLQEAAAABLgEAJQAhLwEAAAABMAEAAAABMQEAAAABCycBAAAAASgBAAAABSkBAAAABSoBAAAAASsBAAAAASwBAAAAAS0BAAAAAS4BACMAIS8BAAAAATABAAAAATEBAAAAAQgnQAAAAAEoQAAAAAQpQAAAAAQqQAAAAAErQAAAAAEsQAAAAAEtQAAAAAEuQAAgACEAAAAAATIBAAAAAQEyAQAAAAEBMkAAAAABAAAAAAMVAAYWAAcXAAgAAAADFQAGFgAHFwAIAQIBAgMBBQYBBgcBBwgBCQoBCgwCCw0DDA8BDRECDhIEERMBEhQBExUCGBgFGRkJ"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map