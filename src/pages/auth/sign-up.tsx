import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Separator,
} from "@/components/ui";
import supabase from "@/utils/supabase"; //회원가입을 위해 supabase 불러오기

import { zodResolver } from "@hookform/resolvers/zod"; //유효성 검사를 쉽게 하기위해 zod를 사용하여 불러옴

import { ArrowLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    email: z.email({
      error: "올바른 형식의 이메일 주소를 입력해주세요.",
    }),
    password: z.string().min(8, {
      error: "비밀번호는 최소 8자 이상이어야 합니다.",
    }),
    confirmPassword: z.string().min(8, {
      error: "비밀번호 확인을 입력해주세요.",
    }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "비밀번호가 일치하지 않습니다.",
        path: ["confirmPassword"],
      });
    }
  });

function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();
  // 필수 동의항목 상태값
  const [serviceAgreed, setServiceAgreed] = useState<boolean>(true); // 서비스 이용약관 동의 여부
  const [privacyAgreed, setPrivacyAgreed] = useState<boolean>(true); // 개인정보 수집 및 이용동의 여부
  const [marketingAgreed, setMarketingAgreed] = useState<boolean>(true); // 마케팅 및 광고 수신 동의 여부

  // 일반 회원가입
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!serviceAgreed || !privacyAgreed) {
      toast.warning("잠깐! 필수 동의가 아직 완료되지 않았어요!");
      return;
    }

    try {
      const {
        data: { user, session },
        error: signUpError,
      } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (signUpError) {
        toast.error(signUpError.message === "User already registered" ? "이미 가입된 계정입니다." : "회원가입 중 오류가 발생했습니다.");
        return;
      }

      // user와 session 두 값 모두 null이 아닐 경우에만 회원가입이 완료되었음을 의미
      if (user && session) {
        // 회원가입 성공 시,
        toast.success("회원가입을 완료하였습니다.");
        navigate("/sign-in"); // => 로그인 페이지로 리디렉션
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <div className="w-full max-w-[1328px] h-full flex items-center justify-center">
      <Card className="w-full max-w-sm border-0 bg-transparent">
        <CardHeader className="gap-0">
          <CardTitle className="text-lg">회원가입</CardTitle>
          <CardDescription>회원가입을 위한 정보를 입력해주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="text-red-500 ">*</span>이메일
                    </FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input placeholder="이메일을 입력하세요." {...field} />
                      </FormControl>
                      <Button>본인 인증</Button>
                    </div>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
              {/* 비밀번호 */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="">
                    <div className="space-y-3">
                      <FormLabel>
                        <span className="text-red-500 ">*</span>비밀번호
                      </FormLabel>
                      <FormControl className="">
                        <Input type="password" placeholder="비밀번호를 입력하세요." {...field} />
                      </FormControl>

                      <FormMessage className="text-sm" />
                    </div>
                  </FormItem>
                )}
              />
              {/* 비밀번호 확인 */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="text-red-500">*</span>비밀번호 확인
                    </FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="비밀번호 확인을 입력하세요." {...field} />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
              {/* 동의 체크 */}
              <div className="space-y-6">
                {/* 필수 동의항목 */}
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-red-500 mr-1">*</span>
                    <span className="font-bold">필수 동의항목</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Checkbox className="mr-2" checked={serviceAgreed} onCheckedChange={(checked) => setServiceAgreed(checked as boolean)} />
                        <span>서비스 이용약관 동의</span>
                      </div>
                      <button className="text-sm text-gray-300 flex items-center hover:underline">
                        자세히{" "}
                        <span className="ml-1">
                          <ChevronRight className="w-4" />
                        </span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Checkbox className="mr-2" checked={privacyAgreed} onCheckedChange={(checked) => setPrivacyAgreed(checked as boolean)} />
                        <span>개인정보 수집 및 이용동의</span>
                      </div>
                      <button className="text-sm text-gray-300 flex items-center hover:underline">
                        자세히{" "}
                        <span className="ml-1">
                          <ChevronRight className="w-4" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <Separator />
                {/* 선택 동의 */}
                <div>
                  <div className="font-bold mb-2">선택 동의항목</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Checkbox className="mr-2" checked={marketingAgreed} onCheckedChange={(checked) => setMarketingAgreed(checked as boolean)} />
                      <span>마케팅 및 광고 수신 동의</span>
                    </div>
                    <button className="text-sm text-gray-300 flex items-center hover:underline">
                      자세히{" "}
                      <span className="ml-1">
                        <ChevronRight className="w-4" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              {/* 회원가입 버튼*/}
              <div className="flex gap-2">
                <Button className="p-0 underline bg-gray-900 text-white" onClick={() => navigate("/sign-in")}>
                  <ArrowLeft />
                </Button>
                <Button type="submit" className="flex-1 w-full bg-green-800 text-white font-bold">
                  회원가입
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="w-full flex items-center justify-center gap-2 -mt-3">
            <p>이미 계정이 있으신가요?</p>

            <NavLink to={"/sign-in"} className="underline underline-offset-4">
              로그인
            </NavLink>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignUp;
