declare global {
    var mongoose: {
      conn: any;
      promise: Promise<typeof import("mongoose")> | null;
    };
  }
  
  export {};
  