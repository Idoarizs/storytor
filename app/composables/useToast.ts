// vue
import { ref } from "vue";

const isOpen = ref(false);
const message = ref("");

const useToast = () => {
  const show = (msg: string) => {
    message.value = msg;
    isOpen.value = true;
  }

  return {
    show,
    isOpen,
    message,
  };
};

export default useToast;
