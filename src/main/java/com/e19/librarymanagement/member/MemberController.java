package com.e19.librarymanagement.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping(path = "api/v1/members")
@RestController
public class MemberController {

    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping()
    List<Member> getMembers(){
        return memberService.getMembers();
    }

    @GetMapping(path = "{memberId}")
    Optional<Member> getMember(@PathVariable("memberId") Long id){
        return memberService.getMember(id);
    }

    @PostMapping
    void addMember(@RequestBody Member member){
        memberService.addMember(member);
    }

}
