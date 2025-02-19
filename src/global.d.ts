/* eslint-disable no-var,@typescript-eslint/no-explicit-any */
declare global {
    var mongoose: {
      conn: any;
      promise: Promise<typeof import("mongoose")> | null;
    };
  }
  
  export {};
  