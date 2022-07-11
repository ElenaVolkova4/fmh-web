import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useAddClaimCommentsMutation,
  useGetClaimCommentsQuery,
  useLazyGetClaimByIdQuery,
} from "src/services/api/claimsApi";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { selectUserInfo } from "src/features/auth/authSlice";
import DrawCard from "src/components/viewCard/ViewCard";
import CommentCard, { IComment } from "src/components/comment/CommentCards";

export interface IClaimComment extends IComment {}

const ViewClaims = () => {
  const { id: claimId } = useParams();
  const [trigger, data] = useLazyGetClaimByIdQuery();
  const [addCommentTrigger] = useAddClaimCommentsMutation();
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    if (claimId) {
      trigger(claimId);
    }
  }, []);

  // TODO change on model
  const addComment = () => {
    const comment = prompt("Коменть!");
    if (comment && claimId) {
      addCommentTrigger({
        id: 0,
        objId: parseInt(claimId, 10),
        createDate: Date.now(),
        creatorId: userInfo.id,
        description: comment,
        creatorName: "",
      });
    }
  };

  return !data.data ? (
    <br />
  ) : (
    <DrawCard
      title="Заявки"
      viewCardTheme={{ key: "Тема", value: data.data.title }}
      obj={[
        {
          key: "Исполнитель",
          value: data.data.executorName,
          style: "view_card__row two_columns",
        },
        {
          key: "Плановая дата",
          value: format(data.data.planExecuteDate, "dd.MM.yyyy"),
          style: "view_card__row two_columns",
        },
        {
          key: "",
          value: data.data.status,
          style: "view_card__row just_center",
        },
        {
          key: "Описание",
          value: data.data.description,
          style: "view_card__description",
        },
        {
          key: "Автор",
          value: data.data.creatorName,
          style: "view_card__row two_columns",
        },
        {
          key: "Дата создания",
          value: format(data.data.createDate, "dd.MM.yyyy"),
          style: "view_card__row two_columns",
        },
      ]}
      comments={<ClaimComments claimId={claimId!} />}
      addComment={addComment}
    />
  );
};

const ClaimComments = ({ claimId }: { claimId: string }) => {
  const { data: comments } = useGetClaimCommentsQuery(claimId);

  return comments ? (
    <div>
      {comments?.map((comment: IClaimComment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  ) : (
    <h1>Nothing</h1>
  );
};

export default ViewClaims;
