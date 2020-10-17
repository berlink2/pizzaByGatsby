import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import { MdLocalPizza } from 'react-icons/md';

export default function Sidebar() {
  return S.list()
    .title("Slick's Slices")
    .items([
      S.listItem()
        .title('Home Page')
        .icon(() => <MdLocalPizza />)
        .child(S.editor().schemaType('storeSettings').documentId('downtown')),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
