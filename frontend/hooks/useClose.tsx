const useClose = (
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsEditOrCreate: React.Dispatch<React.SetStateAction<boolean>>,
  setActive?: React.Dispatch<React.SetStateAction<any | null>>,
) => {
  const handleClose = () => {
    setModalOpen(false);
    setTimeout(() => {
      setActive && setActive(null);
      setIsEditOrCreate(false);
    }, 200);
  };
  return { handleClose };
};

export default useClose;
