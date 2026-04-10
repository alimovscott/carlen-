import { Mutation, Resolver,Query, Args } from '@nestjs/graphql';
import { MemberService } from './member.service';

import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';


@Resolver()

export class MemberResolver {
    constructor(public readonly memberService: MemberService) {}

    @Mutation(() => Member)
    public async signup(@Args("input") input:MemberInput): Promise<Member> {
        console.log("Mutation signup:");
        
        return await this.memberService.signup(input);

       
    }

    @Mutation(() => Member)
    public async login(@Args("input") input:LoginInput): Promise<Member> {
        console.log("Mutation login:");
        
        return  await this.memberService.login(input);

       
       
       
       
    }


    // AUTHENTICATED
    @UseGuards(AuthGuard)
    @Mutation(() => String)
    public async updateMember(@AuthMember('_id') memberId: ObjectId): Promise<string> {
        console.log("Mutation updateMember:");
        console.log(typeof memberId)
        console.log(memberId)
        
        return this.memberService.updateMember();
    }

    @UseGuards(AuthGuard)
    @Query(() => String)
    public async checkAuth(@AuthMember('memberNick') memberNick:string): Promise<string> {
        console.log("Mutation updateMember:");
        console.log('memberNick', memberNick)
        
        return `Hi ${memberNick}`;
    }
    @Roles(MemberType.USER, MemberType.AGENT)
    @UseGuards(RolesGuard)
    @Query(() => String)
    public async checkAuthRoles(@AuthMember() authmember:Member): Promise<string> {
        console.log("Mutation updateMember:");
        console.log('authmember => ', authmember )
        
        return `Hi ${authmember.memberNick}, you are ${authmember.memberType}`;
    }



    @Query(() => String)
    public async getMember(): Promise<string> {
        console.log("Query getMember:");

        return this.memberService.getMember();

    }


    //** ADMIN */
    //** AUTHORIZATION: Admin */
    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(()=> String)
    public async getAllMembersByAdmin(@AuthMember() authMember: Member): Promise<string> {

        console.log("authMember", authMember.memberNick);
        return this.memberService.getAllMembersByAdmin();
    }


    @Mutation(() => String)
    public async updateMemberByAdmin(): Promise<string> {
        console.log("Mutation updateMemberByAdmin:");
        
        return this.memberService.updateMemberByAdmin();
    }
}
