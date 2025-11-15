import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import "./index.css";
import App from "./App.tsx";
import SignUp from "./pages/auth/sign-up.tsx";
import SignIn from "./pages/auth/sign-in.tsx";
import CreateTopic from "./pages/topic/create-topic.tsx";
import DetailTopic from "./pages/topic/detail-topic.tsx";
import UpdateTopic from "./pages/topic/update-topic.tsx";
import AuthLayout from "./components/common/AuthLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
        {/* TOPIC */}
        <Route path="/create-topic" element={<CreateTopic />} />
        <Route path="/topic/:id" element={<DetailTopic />} />
        <Route path="/topic/:edit" element={<UpdateTopic />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
