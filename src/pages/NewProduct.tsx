import { uploadImage } from "../api/uploader";
import Button from "../components/ui/Button";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Product } from "../type/product";
import { addNewProduct } from "../api/firebase";

export default function NewProduct() {
  const initialData: Product = {
    name: "",
    price: "",
    category: "",
    description: "",
    options: "",
  };

  const [newProduct, setNewProduct] = useState<Product>(initialData);
  const [image, setImage] = useState<File | null>(null);
  const [isUpload, setIsUpload] = useState<boolean>(false);
  const [sucess, setSucess] = useState<string | null>(null);
  let inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    return setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpload(true);
    image &&
      uploadImage(image).then((url) =>
        addNewProduct(newProduct, url)
          .then(() => {
            setSucess("✅ 제품 등록에 성공했습니다.");
            setNewProduct(() => initialData);
            setImage(null);
            if (inputFileRef.current) {
              inputFileRef.current.value = "";
            }
            setTimeout(() => {
              setSucess(null);
            }, 4000);
          })
          .catch(() => "❌ 제품 등록에 실패했습니다.")
          .finally(() => setIsUpload(false))
      );
  };
  return (
    <div className="page-newproduct">
      <h2 className="page-title">신규 제품 등록</h2>
      {sucess && <p className="message">{sucess}</p>}
      {image && (
        <div className="board__image">
          <img src={URL.createObjectURL(image)} alt="상품 이미지" />
        </div>
      )}
      <form className="board--write" onSubmit={handleSubmit}>
        <div className="board__item">
          <label htmlFor="image" className="item__label">
            상품 이미지
          </label>
          <span className="filebox">
            <input
              type="file"
              accept="image/*"
              name="image"
              id="image"
              ref={inputFileRef}
              required
              onChange={handleUploadFile}
            />
          </span>
        </div>
        <div className="board__item">
          <label htmlFor="name" className="item__label">
            제품명
          </label>
          <span className="inpbox">
            <input
              type="text"
              className="inpbox__text"
              name="name"
              id="name"
              value={newProduct.name}
              required
              onChange={handleChangeInput}
            />
          </span>
        </div>
        <div className="board__item">
          <label htmlFor="price" className="item__label">
            가격
          </label>
          <span className="inpbox">
            <input
              type="number"
              className="inpbox__text"
              name="price"
              id="price"
              value={newProduct.price}
              required
              onChange={handleChangeInput}
            />
          </span>
        </div>
        <div className="board__item">
          <label htmlFor="category" className="item__label">
            카테고리
          </label>
          <span className="inpbox">
            <input
              type="text"
              className="inpbox__text"
              name="category"
              id="category"
              value={newProduct.category}
              required
              onChange={handleChangeInput}
            />
          </span>
        </div>
        <div className="board__item">
          <label htmlFor="description" className="item__label">
            제품설명
          </label>
          <span className="inpbox">
            <input
              type="text"
              className="inpbox__text"
              name="description"
              id="description"
              value={newProduct.description}
              required
              onChange={handleChangeInput}
            />
          </span>
        </div>
        <div className="board__item">
          <label htmlFor="options" className="item__label">
            옵션들
          </label>
          <span className="inpbox">
            <input
              type="text"
              className="inpbox__text"
              name="options"
              id="options"
              value={newProduct.options}
              required
              placeholder="콤마로 구문"
              onChange={handleChangeInput}
            />
          </span>
        </div>
        <div className="btnset">
          <Button
            type="submit"
            className="btn btn--primary"
            disabled={isUpload}
          >
            {isUpload ? "업로드 중" : "제품 등록하기"}
          </Button>
        </div>
      </form>
    </div>
  );
}
