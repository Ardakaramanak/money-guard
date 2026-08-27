import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import "react-datepicker/dist/react-datepicker.css";

import { addTransaction } from "../../redux/transactions/operations";
import { selectCategories } from "../../redux/finance/selectors";

import css from "./AddTransactionForm.module.css";

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
  const [isExpense, setIsExpense] = useState(false);

  const categories = useSelector(selectCategories);

  const {
    register,
    handleSubmit,
    control,
    setValue,
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

  const currentType = useWatch({
    control,
    name: "type",
  });

  const handleTypeChange = () => {
    const nextType = isExpense ? "INCOME" : "EXPENSE";

    setIsExpense(!isExpense);
    setValue("type", nextType);

    if (nextType === "INCOME") {
      setValue("categoryId", "");
    }
  };

  const onSubmit = async (data) => {
    const finalAmount =
      data.type === "EXPENSE"
        ? -Math.abs(Number(data.amount))
        : Math.abs(Number(data.amount));

    let finalCategoryId = data.categoryId;

    if (data.type === "INCOME") {
      const incomeCategory = categories.find(
        (category) => category.type === "INCOME",
      );

      if (!incomeCategory) {
        toast.error("Gelir (Income) kategorisi bulunamadı.");
        return;
      }

      finalCategoryId = incomeCategory.id;
    }

    const payload = {
      type: data.type,
      amount: finalAmount,
      categoryId: finalCategoryId,
      comment: data.comment,
      transactionDate: data.transactionDate.toISOString(),
    };

    // Redux dispatch işlemi ve backend yanıt süreçleri toast.promise ile yönetiliyor
    toast
      .promise(dispatch(addTransaction(payload)).unwrap(), {
        loading: "İşlem kaydediliyor...",
        success: "İşlem başarıyla eklendi! 💰",
        error: (err) =>
          `İşlem Başarısız: ${err || "Bilinmeyen bir hata oluştu."}`,
      })
      .then(() => {
        onClose(); // İşlem tam olarak başarıya ulaştığında modal kapatılır
      })
      .catch((backendError) => {
        console.error("İşlem ekleme hatası:", backendError);
      });
  };

  const expenseCategories = categories.filter(
    (category) => category.type === "EXPENSE",
  );

  return (
    <div className={css.formContainer}>
      <button type="button" className={css.closeBtn} onClick={onClose}>
        <IoClose size={24} />
      </button>
      <h2 className={css.modalTitle}>Add transaction</h2>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.switchContainer}>
          <span
            className={`${css.switchLabel} ${
              !isExpense ? css.activeIncome : ""
            }`}
          >
            Income
          </span>

          <button
            type="button"
            className={css.switchBase}
            onClick={handleTypeChange}
            aria-label="İşlem türünü değiştir"
          >
            <span
              className={`${css.switchToggle} ${
                isExpense ? css.toggleExpense : css.toggleIncome
              }`}
            >
              {isExpense ? "-" : "+"}
            </span>
          </button>

          <span
            className={`${css.switchLabel} ${
              isExpense ? css.activeExpense : ""
            }`}
          >
            Expense
          </span>
        </div>

        {currentType === "EXPENSE" && (
          <div className={css.fieldGroupFull}>
            <select className={css.selectInput} {...register("categoryId")}>
              <option value="">Kategori Seçiniz</option>
              {expenseCategories.map((category) => (
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

        <div className={css.rowFields}>
          <div className={css.fieldGroup}>
            <input
              type="number"
              step="any"
              placeholder="0.00"
              className={`${css.input} ${css.amountInput}`}
              {...register("amount")}
            />
            {errors.amount && (
              <p className={css.errorText}>{errors.amount.message}</p>
            )}
          </div>

          <div className={css.fieldGroupRelative}>
            <Controller
              control={control}
              name="transactionDate"
              render={({ field }) => (
                <DatePicker
                  className={css.input}
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd.MM.yyyy"
                  wrapperClassName={css.datePickerWrapper}
                />
              )}
            />
            <MdOutlineCalendarMonth className={css.calendarIcon} size={20} />
            {errors.transactionDate && (
              <p className={css.errorText}>{errors.transactionDate.message}</p>
            )}
          </div>
        </div>

        <div className={css.fieldGroupFull}>
          <input
            type="text"
            placeholder="Comment"
            className={css.input}
            {...register("comment")}
          />
          {errors.comment && (
            <p className={css.errorText}>{errors.comment.message}</p>
          )}
        </div>

        <div className={css.formActions}>
          <button type="submit" className={css.addBtn}>
            ADD
          </button>
          <button type="button" className={css.cancelBtn} onClick={onClose}>
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};
