declare namespace Params {
  interface Login {
    name: string;
    passWord: string;
  }
}

declare namespace Api {
  interface ResponseOk {
    msg: string;
    code: number;
  }
}
