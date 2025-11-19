import { useState } from "react";
import supabase from "@/utils/supabase";

function CreateTopic() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  // 이미지 업로드 함수
  const uploadImage = async (file) => {
    if (!file) return "";
    // 파일명 뒤에 타임스탬프 추가 (중복 방지)
    const fileExt = file.name.split(".").pop();
    const fileName = `topic_${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage.from("topic-images").upload(fileName, file);
    if (error) {
      alert("이미지 업로드 실패: " + error.message);
      return "";
    }
    // public URL 반환
    const { publicUrl } = supabase.storage.from("topic-images").getPublicUrl(data.path);
    return publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = "";
    // 썸네일 업로드 (파일 첨부 시)
    if (thumbnail) {
      imageUrl = await uploadImage(thumbnail);
      if (!imageUrl) {
        setLoading(false);
        return;
      }
    }
    // DB에 topic 저장
    const { error } = await supabase.from("topics").insert([
      {
        title,
        content,
        category,
        image_url: imageUrl,
      },
    ]);
    setLoading(false);
    if (error) {
      alert("토픽 저장 실패: " + error.message);
    } else {
      alert("토픽 저장 성공!");
      // 폼 초기화
      setTitle("");
      setContent("");
      setCategory("");
      setThumbnail(null);
    }
  };

  const handleThumbnailChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  const previewUrl = thumbnail ? URL.createObjectURL(thumbnail) : "";

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[600px]">
      <form onSubmit={handleSubmit} className="flex flex-1 gap-8 py-10">
        {/* Step 1: 제목/본문 */}
        <section className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-orange-300 mb-2">
            Step 1<br />
            토픽 작성하기
          </h2>
          <div>
            <label className="text-red-400 block mb-2">* 제목</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-4 rounded bg-neutral-900 text-white" required placeholder="토픽 제목을 입력하세요." />
          </div>
          <div>
            <label className="text-red-400 block mb-2">* 본문</label>
            <textarea rows={7} value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-4 rounded bg-neutral-900 text-white" required placeholder="본문" />
          </div>
        </section>
        {/* Step 2: 카테고리/썸네일 */}
        <section style={{ minWidth: 320 }} className="flex flex-col gap-6">
          <h2 className="font-bold text-pink-300 mb-2">
            Step 2<br />
            카테고리 및 썸네일 등록
          </h2>
          <div>
            <label className="text-red-400 block mb-2">* 카테고리</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 rounded bg-neutral-900 text-white" required>
              <option value="">토픽(주제) 선택</option>
              {/* 카테고리 직접 추가 */}
              <option value="인문학">인문학</option>
              <option value="스타트업">스타트업</option>
              <option value="IT·프로그래밍">IT·프로그래밍</option>
              <option value="서비스·전략 기획">서비스·전략 기획</option>
              <option value="마케팅">마케팅</option>
              <option value="디자인·일러스트">디자인·일러스트</option>
              <option value="자기계발">자기계발</option>
            </select>
          </div>
          <div>
            <label className="text-red-400 block mb-2">* 썸네일</label>
            <div className="flex flex-col items-center gap-2">
              <div className="w-full min-h-[120px] flex items-center justify-center border rounded bg-neutral-900">
                {previewUrl ? <img src={previewUrl} alt="썸네일" className="max-h-[120px]" /> : <span className="text-neutral-400">이미지 없음</span>}
              </div>
              <input type="file" accept="image/*" onChange={handleThumbnailChange} className="w-full" />
              {thumbnail && (
                <button type="button" className="text-red-400 underline" onClick={() => setThumbnail(null)}>
                  썸네일 제거
                </button>
              )}
            </div>
          </div>
        </section>
      </form>
      {/* 하단 버튼 영역 */}
      <div className="flex justify-center gap-4 pb-8">
        <button
          type="button"
          className="bg-neutral-700 text-white px-6 py-2 rounded"
          onClick={() => {
            setTitle("");
            setContent("");
            setCategory("");
            setThumbnail(null);
          }}
        >
          취소
        </button>
        <button type="submit" className="bg-orange-400 text-black px-6 py-2 rounded font-bold" onClick={handleSubmit} disabled={loading}>
          저장
        </button>
      </div>
    </div>
  );
}

export default CreateTopic;
