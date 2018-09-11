<template>
  <div class="popup">
    <div class="popup__elem">
      <div class="popup__close" @click="handleClosePopup"></div>
      <slot></slot>
    </div>
  </div>
</template>

<script src="./Popup.js">
</script>

<style lang="scss">
.popup {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(#3d3b3a, 0.7);

  &__elem {
    position: absolute;
    padding: 30px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 10px;
  }

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      top: 50%;
      left: 0;
      background-color: #dadada;
      border-radius: 2px;
    }
    &::before {
      transform: translate(0, -50%) rotate(45deg);
    }
    &::after {
      transform: translate(0, -50%) rotate(-45deg);
    }
  }
}
</style>
