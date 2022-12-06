import {
    ACTION_LIKE
} from './types';

import LikeService from '../../services/LikeService';

export const actionLike = id => async dispacth => {
    try {
        await LikeService.action(id);
        
        dispacth({
            type: ACTION_LIKE,
            payload: { id },
        });
    } catch (error) {
        console.error(error);
    }
}