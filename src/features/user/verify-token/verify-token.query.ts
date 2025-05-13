export class VerifyTokenQuery {
    constructor(public readonly id: number, readonly access_token:string) {}
}