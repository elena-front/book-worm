import { useMemo, useRef, useState } from "react";
import { axiosInstance } from "../shared/lib/axiosInstance";

const TARGET_W = 400;
const TARGET_H = 600;

async function resizeToCover(file) {
  const img = await new Promise((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = URL.createObjectURL(file);
  });

  const canvas = document.createElement("canvas");
  canvas.width = TARGET_W;
  canvas.height = TARGET_H;
  const ctx = canvas.getContext("2d");

  const srcW = img.width;
  const srcH = img.height;
  const srcRatio = srcW / srcH;
  const dstRatio = TARGET_W / TARGET_H;

  let sx = 0,
    sy = 0,
    sWidth = srcW,
    sHeight = srcH;

  if (srcRatio > dstRatio) {
    sWidth = Math.round(srcH * dstRatio);
    sx = Math.round((srcW - sWidth) / 2);
  } else {
    sHeight = Math.round(srcW / dstRatio);
    sy = Math.round((srcH - sHeight) / 2);
  }

  ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, TARGET_W, TARGET_H);

  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 0.9)
  );

  const resizedFile = new File([blob], "cover.jpg", { type: "image/jpeg" });
  const previewUrl = URL.createObjectURL(blob);

  return { file: resizedFile, previewUrl };
}

export default function AddBook() {
  const fileRef = useRef(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");

  const [cover, setCover] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [processing, setProcessing] = useState(false);

  const canSubmit = useMemo(() => {
    return title.trim() && author.trim() && !processing;
  }, [title, author, processing]);

  function openPicker() {
    fileRef.current?.click();
  }

  async function handlePickedFile(file) {
    if (!file) return;

    const okTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!okTypes.includes(file.type)) {
      alert("Поддерживаются только JPG, PNG, WebP");
      return;
    }

    setProcessing(true);
    try {
      const { file: resized, previewUrl } = await resizeToCover(file);
      setCover(resized);
      setCoverPreview(previewUrl);
    } catch (e) {
      console.error(e);
      alert("Не удалось обработать изображение");
    } finally {
      setProcessing(false);
    }
  }

  async function onFileChange(e) {
    const file = e.target.files?.[0];
    await handlePickedFile(file);
    e.target.value = "";
  }

  async function onDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    await handlePickedFile(file);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    // ✅ multipart/form-data (для multer)
    const fd = new FormData();
    fd.append("title", title.trim());
    fd.append("author", author.trim());
    fd.append("comment", comment.trim());
    if (cover) fd.append("cover", cover); // поле cover должно совпадать с upload.single("cover")

    // const res = await axiosInstance.post("/books", {
    //   method: "POST",
    //   body: fd,
    // });


    //новый  код
      try {
    const res = await axiosInstance.post("/books", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("Книга добавлена!");
    window.location.href = "/";
  } catch (err) {
    console.error("CREATE BOOK ERROR:", err?.response?.data || err);
    alert("Не удалось добавить книгу");
  }



    // if (!res.ok) {
    //   const txt = await res.text().catch(() => "");
    //   console.error("CREATE BOOK ERROR:", txt);
    //   alert("Не удалось добавить книгу");
    //   return;
    // }

    // alert("Книга добавлена!");
    // window.location.href = "/";
  }

  return (
    <section className="page">
      <div className="container">
        <div className="formCard">
          <div className="formCard__header">
            <div className="formCard__icon" aria-hidden="true">
              ➕
            </div>
            <h2 className="formCard__title">Добавить книгу</h2>
          </div>

          <form className="form" onSubmit={onSubmit}>
            <label className="field">
              <span className="field__label">Название книги</span>
              <input
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Например: Мастер и Маргарита"
                required
              />
            </label>

            <label className="field">
              <span className="field__label">Автор</span>
              <input
                className="input"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Например: Михаил Булгаков"
                required
              />
            </label>

            <label className="field">
              <span className="field__label">Описание / комментарий</span>
              <textarea
                className="textarea"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Поделитесь своими впечатлениями..."
                rows={5}
              />
            </label>

            <div className="field">
              <span className="field__label">Обложка книги</span>

              <div className="uploadRow">
                <div
                  className="uploadBox"
                  role="button"
                  tabIndex={0}
                  onClick={openPicker}
                  onKeyDown={(e) => e.key === "Enter" && openPicker()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={onDrop}
                  aria-busy={processing ? "true" : "false"}
                  title="Нажмите или перетащите файл"
                >
                  {coverPreview ? (
                    <img
                      className="uploadBox__img"
                      src={coverPreview}
                      alt="Превью обложки 400×600"
                      width={TARGET_W}
                      height={TARGET_H}
                    />
                  ) : (
                    <>
                      <div className="uploadBox__arrow" aria-hidden="true">
                        ⬆
                      </div>
                      <div className="uploadBox__text">
                        {processing ? "Обработка..." : "Нажмите для загрузки"}
                      </div>
                    </>
                  )}

                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    hidden
                    onChange={onFileChange}
                  />
                </div>

                <div className="uploadHint">
                  Рекомендуемый размер: <b>400×600</b> пикселей. Поддерживаемые
                  форматы: JPG, PNG, WebP.
                  <br />
                  {cover ? (
                    <span>Загружено и приведено к 400×600.</span>
                  ) : (
                    <span>
                      Изображение будет автоматически обрезано и приведено к
                      400×600.
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button className="btnPrimary" type="submit" disabled={!canSubmit}>
              ➕ Добавить книгу
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
