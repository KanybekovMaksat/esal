import $api from '~shared/api';
import { CreateComment } from './comment.types';

export function getComments(id: number) {
  return $api.get(`places/${id}/reviews/`);
}

export function createComment(params: { comment: CreateComment }) {
  return $api.post(
    `places/${params.comment.place}/reviews/`,
    params.comment
  );
}

export function updateComment(
  placeId: number,
  commentId: number,
  comment: any = {}
) {
  return $api.patch(`palces/${placeId}/reviews/${commentId}/`, comment);
}

export function deleteComment(params: {
  placeId: number;
  commentId: number;
}) {
  return $api.delete(
    `places/${params.placeId}/reviews/${params.commentId}/`
  );
}
