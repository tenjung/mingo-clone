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

import { zodResolver } from "@hookform/resolvers/zod";

import { ArrowLeft, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { z } from "zod";

const formSchema = z.object({
  email: z.email("올바른 형식의 이메일 주소를 입력해주세요."),
  password: z.string().min(8, {
    message: "비밀번호는 최소한 8자 이상으로 작성해주세요.",
  }),
  comfirmPassword: z.string().min(8, { message: "비밀번호 확인을 입력해주세요" }),
});

function SignUp() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      comfirmPassword: "",
    },
  });

  // 회원가입
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
                name="comfirmPassword"
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
                        <Checkbox className="mr-2" />
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
                        <Checkbox className="mr-2" />
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
                      <Checkbox className="mr-2" />
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
