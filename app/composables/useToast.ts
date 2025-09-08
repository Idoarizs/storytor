// vue
import { ref } from "vue";

const isOpen = ref(false);
const message = ref("");

const useToast = () => {
  function show(msg: string, duration = 3000) {
    message.value = msg;
    isOpen.value = true;

    setTimeout(() => {
      isOpen.value = false;
    }, duration);
  }

  return {
    show,
    isOpen,
    message,
  };
};

export default useToast;
