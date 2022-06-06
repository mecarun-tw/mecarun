import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getProductUuid, Product, ProductKey } from "src/app/_interfaces/product.interface";
import { ApiInterface } from "./api.interface";
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class Api implements ApiInterface {

  constructor (
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,
    private angularFireAuth: AngularFireAuth,
  ) {}

  login = (token: string) => {
    return this.angularFireAuth.signInWithEmailAndPassword('administrator@mail.com', token).then(() => {
      return;
    });
  };

  readProductKeys = (language: string) => {
    return this.angularFirestore.collection<ProductKey>(
      'productKeys',
      document => document.where('language', '==', language)
    ).get().toPromise().then(query => {
      if (query.docs.length > 0) {
        return query.docs.map(doc => doc.data());
      } else {
        return Promise.reject('NOT_EXIST');
      }
    });
  };

  createProductKey = (productKey: ProductKey) => {
    if (productKey.productId === '') {
      productKey.productId = uuidv4();
    }
    productKey.uuid = getProductUuid(productKey.productId, productKey.language);
    return this.angularFirestore.doc<ProductKey>('productKeys/' + productKey.uuid).set(productKey).then(() => {
      return productKey;
    });
  }

  updateProductKey = (productKey: ProductKey) => {
    const docRef = this.angularFirestore.collection<ProductKey>('productKeys').doc<ProductKey>(productKey.uuid).ref;
    return docRef.get().then(doc => {
      if (doc.exists) {
        return docRef.update(productKey).then(() => {
          return productKey;
        });
      } else {
        return Promise.reject('NOT_EXIST');
      }
    });
  };

  deleteProductKey = (uuid: string) => {
    const docRef = this.angularFirestore.collection<ProductKey>('productKeys').doc<ProductKey>(uuid).ref;
    return docRef.get().then(doc => {
      if (doc.exists) {
        return docRef.delete();
      } else {
        return Promise.reject('NOT_EXIST');
      }
    });
  };

  updateOrders = (productKeys: ProductKey[]) => {
    const batch = this.angularFirestore.firestore.batch();
    productKeys.forEach(productKey => {
      batch.update(
        this.angularFirestore.doc<ProductKey>('productKeys/' + productKey.uuid).ref,
        {order: productKey.order}
      );
    });
    return batch.commit();
  };

  readProduct = (uuid: string) => {
    return this.angularFirestore.collection<Product>('products').doc<Product>(uuid).ref.get().then(doc => {
      if (doc.exists) {
        return doc.data() as Product;
      } else {
        return Promise.reject('NOT_EXIST');
      }
    });
  };

  createProduct = (product: Product) => {
    return this.angularFirestore.doc<Product>('products/' + product.uuid).set(product).then(() => {
      return product;
    });
  };

  updateProduct = (product: Product) => {
    const docRef = this.angularFirestore.collection<Product>('products').doc<Product>(product.uuid).ref;
    return docRef.get().then(doc => {
      if (doc.exists) {
        return docRef.update(product).then(() => {
          return product;
        });
      } else {
        return Promise.reject('NOT_EXIST');
      }
    });
  };

  deleteProduct = (uuid: string) => {
    const docRef = this.angularFirestore.collection<Product>('products').doc<Product>(uuid).ref;
    return docRef.get().then(doc => {
      if (doc.exists) {
        return docRef.delete();
      } else {
        return Promise.reject('NOT_EXIST');
      }
    });
  };

  getImageUrl = (uuid: string) => {
    return this.angularFireStorage.ref('product/' + uuid).getDownloadURL().toPromise() as Promise<string>;
  };

  uploadImage = (dataUrl: string) => {
    const uuid = uuidv4();
    this.angularFireStorage.ref('product/' + uuid).putString(dataUrl, 'data_url');
    return Promise.resolve(uuid);
  };

  deleteImage = (uuid: string) => {
    return this.angularFireStorage.ref('product/' + uuid).delete().toPromise() as Promise<void>;
  };
}