import { Types } from 'mongoose';
import { Schema, model } from 'mongoose';
import type { Freet } from 'freet/model';

export type CollectionDO = {
    _id: Types.ObjectId;
    name: string;
    freets: [Types.ObjectId];
}

const CollectionDOSchema = new Schema<CollectionDO>({
    name: {
        type: Schema.Types.String,
    },
    freets: {
        type: [{
            id: Schema.Types.ObjectId,
        }],
        required: false
    },
})

const CollectionDOModel = model<CollectionDO>('CollectionDO', CollectionDOSchema);
export default CollectionDOModel;