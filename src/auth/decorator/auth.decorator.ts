import {createParamDecorator, SetMetadata} from "@nestjs/common";

export const AuthPrincipal = createParamDecorator((_, req) => req.args[0].user);

export const Public = () => SetMetadata( "isPublic", true );
