import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Kendi transactions operations dosyanızdaki addTransaction thunk'ı
import { addTransaction } from "../../redux/transactions/operations";
import css from "./AddTransactionForm.module.css";

import { selectCategories } from "../../redux/finance/selectors";

// Yup Doğrulama Şeması (Validation Schema)
const validationSchema = Yup.object().shape({
  type: Yup.string().required(),
  amount: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .typeError("Tutar bir sayı olmalıdır")
    .positive("Tutar 0'dan büyük olmalıdır")
    .required("Tutar alanı zorunludur"),
  transactionDate: Yup.date()
    .typeError("Geçerli bir tarih seçiniz")
    .required("Tarih alanı zorunludur"),
  comment: Yup.string().required("Yorum alanı zorunludur"),
  categoryId: Yup.string().when("type", {
    is: "EXPENSE",
    then: () =>
      Yup.string().required(
        "Gider işlemleri için kategori seçilmesi zorunludur",
      ),
    otherwise: () => Yup.string().notRequired(),
  }),
});

export const AddTransactionForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [isExpense, setIsExpense] = useState(false); // Varsayılan: Income (false)

  // 2. Redux'ta duran gerçek backend kategorilerini çekiyoruz
  const categories = useSelector(selectCategories);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      type: "INCOME",
      amount: "",
      transactionDate: new Date(),
      comment: "",
      categoryId: "",
    },
  });

  // Stilize edilmiş değiştirici (Switch) tetikleyicisi
  const handleTypeChange = () => {
    const nextType = isExpense ? "INCOME" : "EXPENSE";
    setIsExpense(!isExpense);
    setValue("type", nextType);
    if (nextType === "INCOME") {
      setValue("categoryId", ""); // Gelir ise kategori temizlenir
    }
  };

  const onSubmit = (data) => {
    // 1. Tutar Yönetimi: Gider ise negatif yap, gelir ise pozitif bırak
    const finalAmount =
      data.type === "EXPENSE"
        ? -Math.abs(Number(data.amount))
        : Math.abs(Number(data.amount));

    // 2. Kategori Yönetimi (INCOME için Kritik Aşama):
    let finalCategoryId = data.categoryId;

    if (data.type === "INCOME") {
      // Redux'taki 11 elemanlı listeden tipi "INCOME" olan kategoriyi otomatik buluyoruz
      const incomeCategory = categories?.find((cat) => cat.type === "INCOME");

      // Eğer bulduysa resmi UUID'yi (063f1132-...) atıyoruz, yoksa kullanıcının girdiğini koruyoruz
      if (incomeCategory) {
        finalCategoryId = incomeCategory.id;
      }
    }

    // API uyumluluğu için hazırlanan nihai veri paketi
    const payload = {
      ...data,
      amount: finalAmount,
      categoryId: finalCategoryId, // Otomatik olarak resmi Income UUID'si yerleştirildi
      transactionDate: data.transactionDate.toISOString(),
    };

    // Backend'e istek gönderme anı
    dispatch(addTransaction(payload))
      .unwrap()
      .then(() => {
        // İstek başarılı: Sayfa yenilenmeden Redux listesi güncellenir ve modal kapanır
        onClose();
      })
      .catch((backendError) => {
        // Backend hata döndürürse hata mesajını basar, verileri silmez
        alert(`İşlem Başarısız: ${backendError}`);
      });
  };
  const currentType = watch("type");

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      {/* STİLİZE EDİLMİŞ DEĞİŞTİRİCİ (SWITCH TOGGLE) */}
      <div className={css.switchContainer}>
        <span
          className={`${css.switchLabel} ${!isExpense ? css.activeIncome : ""}`}
        >
          Income
        </span>
        <div className={css.switchBase} onClick={handleTypeChange}>
          {/* isExpense false olduğunda toggleIncome sınıfı çalışacak ve buton sola (Gelir'e) kayacak */}
          <div
            className={`${css.switchToggle} ${isExpense ? css.toggleExpense : css.toggleIncome}`}
          >
            {isExpense ? "-" : "+"}
          </div>
        </div>
        <span
          className={`${css.switchLabel} ${isExpense ? css.activeExpense : ""}`}
        >
          Expense
        </span>
      </div>

      {/* GİDER İSE KATEGORİ SEÇİM ALANI */}
      {currentType === "EXPENSE" && (
        <div className={css.fieldGroup}>
          <select className={css.selectInput} {...register("categoryId")}>
            <option value="">Kategori Seçiniz</option>

            {/* Gerçek kategorileri haritalandırıyoruz */}
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
          {errors.categoryId && (
            <p className={css.errorText}>{errors.categoryId.message}</p>
          )}
        </div>
      )}

      {/* TUTAR VE TARİH YAN YANA ALANLAR */}
      <div className={css.rowFields}>
        <div className={css.fieldGroup}>
          <input
            type="number"
            step="any"
            placeholder="0.00"
            className={css.input}
            {...register("amount")}
          />
          {errors.amount && (
            <p className={css.errorText}>{errors.amount.message}</p>
          )}
        </div>

        <div className={css.fieldGroup}>
          {/* React Datepicker Entegrasyonu */}
          <Controller
            control={control}
            name="transactionDate"
            render={({ field }) => (
              <DatePicker
                className={css.input}
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd.MM.yyyy"
              />
            )}
          />
          {errors.transactionDate && (
            <p className={css.errorText}>{errors.transactionDate.message}</p>
          )}
        </div>
      </div>

      {/* YORUM ALANI */}
      <div className={css.fieldGroup}>
        <textarea
          placeholder="Comment"
          rows="3"
          className={css.textarea}
          {...register("comment")}
        />
        {errors.comment && (
          <p className={css.errorText}>{errors.comment.message}</p>
        )}
      </div>

      {/* AKSİYON BUTONLARI */}
      <div className={css.formActions}>
        <button type="submit" className={css.addBtn}>
          Add
        </button>
        <button type="button" className={css.cancelBtn} onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};
