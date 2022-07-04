import React, { useState } from "react";
import FormClaims from "src/pages/claims/components/formClaims/FormClaims";
import { IClaims } from "src/pages/claims/ClaimsPage";
import { useAddClaimsMutation } from "src/services/api/claimsApi";
import ModalComponent from "src/components/modalComponent/ModalComponent";

const AddClaims = () => {
  const [addClaim] = useAddClaimsMutation();
  const newClaim: IClaims = {
    createDate: Date.now(),
    creatorId: 0,
    creatorName: "",
    description: "",
    executorId: 0,
    executorName: "",
    factExecuteDate: null,
    id: 0,
    planExecuteDate: Date.now(),
    status: "",
    title: "",
  };
  const [visible, setVisible] = useState(true);

  const changeVisible = () => {
    setVisible(!visible);
  };

  return (
    <ModalComponent visible={visible} setVisible={changeVisible}>
      <FormClaims
        claims={newClaim}
        titlePage="Создание заявки"
        submit={addClaim}
        cancelButton={changeVisible}
      />
    </ModalComponent>
  );
};

export default AddClaims;
