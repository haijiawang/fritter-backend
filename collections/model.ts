import { Types } from 'mongoose';
import { Schema, model } from 'mongoose';

export type CollectionDO = {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    name: string;
}

const CollectionDOSchema = new Schema<CollectionDO>({
    userId: {
        type: Schema.Types.ObjectId,
    },
    name: {
        type: Schema.Types.String,
    },
})

const CollectionDOModel = model<CollectionDO>('CollectionDO', CollectionDOSchema);
export default CollectionDOModel;