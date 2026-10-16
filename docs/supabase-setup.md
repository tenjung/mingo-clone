# Supabase 연결 계약

## 기존 프로젝트부터 확인

기존 환경 변수에 있던 호스트는 2026-10-16 DNS 조회가 실패했다. 삭제·일시 정지·주소 오류 중 어느 상태인지는 확인 불가다. 기존 프로젝트의 정상 주소와 공개 anon/publishable key를 확인해 `.env.local`에 입력한다. 실제 운영 프로젝트를 다른 프로젝트로 임의 대체하지 않는다.

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_KEY
```

서비스 역할 키를 이 파일에 넣지 않는다. 저장소는 기존 `topics`와 Storage `files`를 사용한다. 원격 스키마나 권한은 이번 작업에서 변경하지 않았다.

## 원본 코드에서 확인한 데이터 계약

| topics 필드 | 용도                                          |
| ----------- | --------------------------------------------- |
| id          | 숫자형 게시글 ID, 새 글 insert 시 DB에서 생성 |
| title       | 글 제목                                       |
| category    | 게시판 ID                                     |
| content     | 기존 BlockNote 배열의 JSON 문자열             |
| author      | Supabase 사용자 UUID                          |
| created_at  | DB가 기본 생성하는 작성 시각                  |
| status      | 공개 글 `PUBLISH`, 기존 임시 글 `TEMP`        |
| thumbnail   | 첨부 사진의 공개 URL, 사진 미첨부 시 null     |

기존 DB에 thumbnail 필수 제약이나 category 허용값 제약이 있는지는 연결 복구 후 확인해야 한다. 스키마가 코드 계약과 다르면 기존 데이터를 먼저 확인하고 마이그레이션한다.

새 게시판 ID: `notice`, `welcome`, `question`, `news`, `schedule-tip`, `cheer`, `free`, `letter`, `review`, `photo`, `video`. 과거 카테고리는 전체글에 ‘이전 게시글’로 표시하며 임의로 덮어쓰지 않는다.

## 필요한 DB 권한

기존 RLS를 먼저 조회해야 한다. 다음은 요구되는 동작이며 실행용 마이그레이션이 아니다.

- 비회원과 회원은 `status = 'PUBLISH'`인 글만 읽기.
- 인증된 회원은 `author = auth.uid()`인 글만 생성.
- 회원 작성 카테고리는 `welcome`, `question`, `news`, `schedule-tip`, `cheer`, `free`, `letter`, `review`, `photo`, `video`로 제한. `notice`는 운영자 전용으로 DB에서도 제한.
- 삭제는 `author = auth.uid()`인 글만 허용.
- 임시 글은 본인 외 공개 금지.

Server Actions에서 작성자와 카테고리를 검증하지만 RLS도 독립적으로 같은 조건을 적용해야 한다. 앱 화면에서 버튼을 숨기는 것만으로 접근 제어를 대체하지 않는다.

## 사진 저장소

`files` bucket을 사용한다. 원본 코드도 공개 URL을 게시글에 저장하므로 사진 공개 읽기가 가능한 설정이 필요하다. 저장 경로는 `topics/{사용자 UUID}/{무작위 UUID}.{확장자}`다. 업로드·실패 시 파일 정리는 경로의 사용자 UUID와 `auth.uid()`가 일치하는 파일만 허용한다. 기존 다른 Storage 정책을 임의로 삭제하거나 bucket 전체 쓰기를 열지 않는다.

앱은 JPG·PNG·WebP, 최대 5MB를 허용한다. 같은 제한을 bucket에도 설정하면 직접 API 호출에도 적용할 수 있다.

## 인증

이메일 인증과 비밀번호 로그인을 사용한다. Supabase Auth의 Site URL과 Redirect URLs에 실제 운영 URL, 개발용 `http://localhost:3000`, 필요한 `/auth/callback` 경로를 등록한다. 회원가입의 이메일 인증 필요 여부는 프로젝트 설정을 따른다. 신규 회원에게는 `user_metadata.nickname`을 저장한다. 사용자 메타데이터는 권한 판단에 사용하지 않는다.

기존 Google 로그인 버튼을 유지하고 누락되었던 `/auth/callback`의 PKCE 코드 교환을 구현했다. Google 제공자가 기존 프로젝트에서 활성화되어 있어야 한다. 실제 OAuth 인증 성공은 연결 복구 후 확인해야 한다.

## 일정과 일반 게시글의 구분

일정 제보는 기존 topics 계약을 사용하며 category=`schedule-tip`으로 저장한다. 일반 제보 글을 확정 일정으로 자동 승격하지 않는다. 확인된 일정은 현재 `src/data/schedules.ts`에서 별도로 관리하므로 DB 컬럼을 추가하지 않는다. 게시판에 category CHECK 제약이나 RLS 허용 목록이 있다면 위의 새 ID를 검토해야 한다. 원격 DB는 이번 개편에서도 변경하지 않았다.
