import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/components/ui";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { z } from "zod";

const formSchema = z.object({
  email: z.email("올바른 형식의 이메일 주소를 입력해주세요."),
  password: z.string().min(8, {
    message: "비밀번호는 최소한 8자 이상으로 작성해주세요.",
  }),
});

function SignIn() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 로그인
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="w-full max-w-[1328px] h-full flex items-center justify-center">
      <Card className="w-full max-w-sm border-0 bg-transparent">
        <CardHeader className="gap-0">
          <CardTitle className="text-lg">로그인</CardTitle>
          <CardDescription>로그인을 위한 정보를 입력해주세요</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input placeholder="이메일을 입력하세요." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>비밀번호</FormLabel>
                      <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                        비밀번호를 잊으셨나요?
                      </a>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="비밀번호를 입력하세요." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  로그인
                </Button>
                <Button variant="outline" className="w-full">
                  <img src="/icons/google.svg" alt="@GOOGLE" className="w-4" />
                  구글 로그인
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="w-full flex items-center justify-center gap-2 -mt-3">
            <p>계정이 없으신가요?</p>
            {/* <Button variant={"link"} className="p-0 underline" onClick={() => navigate("/sign-up")}>
                            회원가입
                        </Button> */}
            <NavLink to={"/sign-up"} className="underline underline-offset-4">
              회원가입
            </NavLink>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignIn;
