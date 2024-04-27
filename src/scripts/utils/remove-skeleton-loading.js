const RemoveSkeletonLoading = () => {
  setTimeout(() => {
    const skeletonElements = document.querySelectorAll('.skeleton');
    skeletonElements.forEach((skeletonElement) => skeletonElement.classList.remove('skeleton'));
  }, 500);
};

export default RemoveSkeletonLoading;
