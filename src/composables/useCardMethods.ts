import { reactive } from 'vue';
import type { Ref } from 'vue';

export interface CardSettings {
  rotateAngle: string;
  transitionStyle: string;
  shadowAngle: string;
  xTransitionIndex: number;
  yTransitionIndex: number;
}

const DEFAULT_SETTINGS: CardSettings = {
  rotateAngle: 'rotateX(0deg) rotateY(0deg)',
  transitionStyle: 'transform 1s ease, box-shadow 1s ease',
  shadowAngle: '0px 10px 4px rgba(0,0,0, 0.25)',
  xTransitionIndex: 10,
  yTransitionIndex: 10,
};

export function useCardMethods(
  card: Ref<HTMLElement | null>,
  settings?: CardSettings,
) {
  const cardSettings = reactive<CardSettings>({
    ...DEFAULT_SETTINGS,
    ...settings,
  });

  /**
   * updates cardSettings reactive variable based on the new cursor position
   * @param event - Mouse event
   */
  function cardRotateHandler(event: MouseEvent): void {
    if (card.value === null) {
      return;
    }
    const rect = card.value.getBoundingClientRect(); // Get card position data

    // Сard central coordinate (X and Y)
    const centerX = rect.left + rect.width / 2; 
    const centerY = rect.top + rect.height / 2; 

    // Cursor position relative to card's central coordinate
    const x = event.clientX - centerX;
    const y = event.clientY - centerY; 

    // Card rotate angle and smooth transition index
    const rotateX = y / cardSettings.xTransitionIndex;
    const rotateY = -x / cardSettings.yTransitionIndex;

    cardSettings.transitionStyle = 'transform 0.1s ease-out';
    cardSettings.rotateAngle = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.2) `;
    cardSettings.shadowAngle = `${rotateY / 2}px ${-rotateX / 2}px 4px rgba(0,0,0, 0.75)`;
  }

  /**
   * resets rotation params to default values
   */
  function resetRotation(): void {
    cardSettings.transitionStyle = DEFAULT_SETTINGS.transitionStyle;
    cardSettings.rotateAngle = DEFAULT_SETTINGS.rotateAngle;
    cardSettings.shadowAngle = DEFAULT_SETTINGS.shadowAngle;
  }

  /**
   * Fix central position of the block on cursor
   * ```ts
   * foo.addEventListener('dragover', cardDragHandler)
   * ```
   * @param event - dragover event
   */
  function cardDragHandler(event: DragEvent): void {
    if (card.value) {
      card.value.style.position = 'absolute';
      card.value.style.left = `${event.clientX - card.value.offsetWidth / 2}px`;
      card.value.style.top = `${event.clientY - card.value.offsetHeight / 2}px`;
    }
  }

  /**
   * Replace block duplicate by empty image on drag event
   * ```ts
   * foo.addEventListener('dragstart', dragStartHandler)
   * ```
   * @param event - drag event
   */
  function dragStartHandler(event: DragEvent): void {
    const img = new Image();
    img.src =
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='1' height='1'></svg>";
    event.dataTransfer?.setDragImage(img, 0, 0);
  }
  return {
    cardSettings,
    cardRotateHandler,
    cardDragHandler,
    dragStartHandler,
    resetRotation,
  };
}
