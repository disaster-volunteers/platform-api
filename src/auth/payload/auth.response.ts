export class AuthResponse {
    constructor(
        public id: number,
        public username: string = '',
        public name: string = '',
        public available: boolean = false
    ) {
    }

}
