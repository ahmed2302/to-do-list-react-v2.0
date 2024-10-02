import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // استخدم initReactI18next
  .init({
    resources: {
      ar: {
        translation: {
          edit_task: "تعديل المهمة",
          please_enter_title_details: "يرجى إدخال العنوان والتفاصيل",
          delete_task_confirmation: "هل أنت متأكد أنك ترغب في حذف هذه المهمة؟",
          cannot_undo_delete:
            "لا يمكنك التراجع عن الحذف بعد الضغط على زر الحذف",
          close: "إغلاق",
          yes_delete: "نعم، قم بالحذف",
          add_task: "إضافة مهمة",
          task_title: "عنوان المهمة",
          task_body: "تفاصيل المهمة",
          alert_switch_Lang: "تم تغيير اللغة إلى الإنجليزية بنجاح",
          alert_task_added: "تم إضافة المهمة بنجاح",
          alert_task_empty: "يجب إدخال عنوان المهمة",
          alert_task_status_changed_to_complete:
            "تم تغيير حالة المهمة إلى المنجز بنجاح",
          alert_task_status_changed_to_non_complete:
            "تم تغيير حالة المهمة إلى غير المنجز بنجاح",
          alert_task_edited: "تم تعديل المهمة بنجاح",
          alert_task_deleted: "تم حذف المهمة بنجاح",
          my_tasks: "مهامي",
          all: "الكل",
          completed: "المنجز",
          non_completed: "غير المنجز",
        },
      },
      en: {
        translation: {
          edit_task: "Edit Task",
          please_enter_title_details: "Please enter the title and details.",
          delete_task_confirmation:
            "Are you sure you want to delete this task?",
          cannot_undo_delete:
            "You cannot undo the deletion after pressing the delete button.",
          close: "Close",
          yes_delete: "Yes, delete it.",
          add_task: "Add a Task",
          task_title: "Task Title",
          task_body: "Task Details",
          alert_switch_Lang: "Language switched to Arabic successfully.",
          alert_task_added: "Task added successfully.",
          alert_task_empty: "You must enter a title for the task.",
          alert_task_status_changed_to_complete:
            "Task status changed to completed successfully.",
          alert_task_status_changed_to_non_complete:
            "Task status changed to not completed successfully.",
          alert_task_edited: "Task edited successfully.",
          alert_task_deleted: "Task deleted successfully.",
          my_tasks: "My Tasks",
          all: "All",
          completed: "Completed",
          non_completed: "Not Completed",
        },
      },
    },
    lng: "ar", // اللغة الافتراضية
    fallbackLng: "en", // اللغة الاحتياطية
    interpolation: {
      escapeValue: false, // React يقوم بذلك
    },
  });

export default i18n;
