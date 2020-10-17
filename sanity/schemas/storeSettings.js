import { MdStore as icon } from 'react-icons/md';

export default {
  // computer name
  name: 'storeSettings',
  // visible title
  title: 'Settings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Store Name',
      type: 'string',
      description: 'Store Location',
    },
    {
      name: 'slicemaster',
      title: 'Slicemasters slicing today',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    },
    {
      name: 'hotSlices',
      title: 'Hot Slices today',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'Pizza' }] }],
    },
  ],
};
