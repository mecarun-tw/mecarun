import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LanguagePackage } from "../_interfaces/language-package.interface";
import { Product, ProductKey } from "../_interfaces/product.interface";
import { ApiInterface } from "./api.interface";

@Injectable({
  providedIn: 'root'
})
export class Api implements ApiInterface {

  private productKeys$ = new BehaviorSubject<LanguagePackage<ProductKey[]>>({
    uuid: '',
    languages:new Map([
      [
        'zh',
        [
          {
            uuid: 'PRODUCT_KEY_UUID_0',
            name: 'P18 金屬處理劑',
            price: '250~1100 NTD',
            shortDescription: `
              *.保護金屬機件，提升壽命<br>
              *.增強金屬表面強韌度<br>
              用於發動機、車軸、減速器和增速器的表面。<br>
              降低發動機溫度
            `,
            thumbnailUrl: 'assets/images/products/P18_thumbnail.png'
          },{
            uuid: 'PRODUCT_KEY_UUID_1',
            name: '產品名稱',
            price: '123',
            shortDescription: '簡短描述。簡短描述。簡短描述。簡短描述。簡短描述。',
            thumbnailUrl: ''
          },{
            uuid: 'PRODUCT_KEY_UUID_2',
            name: '產品名稱',
            price: '123',
            shortDescription: '簡短描述。簡短描述。簡短描述。簡短描述。簡短描述。',
            thumbnailUrl: ''
          }
        ]
      ], [
        'en',
        [
          {
            uuid: 'PRODUCT_KEY_UUID_0',
            name: 'Product Name',
            price: '123',
            shortDescription: 'short description. short description. short description. short description. short description. ',
            thumbnailUrl: ''
          },{
            uuid: 'PRODUCT_KEY_UUID_1',
            name: 'Product Name',
            price: '123',
            shortDescription: 'short description. short description. short description. short description. short description. ',
            thumbnailUrl: ''
          },{
            uuid: 'PRODUCT_KEY_UUID_2',
            name: 'Product Name',
            price: '123',
            shortDescription: 'short description. short description. short description. short description. short description. ',
            thumbnailUrl: ''
          }
        ]
      ]
    ])
  });

  private products$ = new BehaviorSubject<LanguagePackage<Product>[]>([
    {
      uuid: 'PRODUCT_KEY_UUID_0',
      languages: new Map([[
          'zh',{
            uuid: 'PRODUCT_KEY_UUID_0',
            name: 'P18 金屬處理劑',
            price: '250~1100 NTD',
            description: `
              什麼是P 18？<br>
              P 18不是傳統技術上的潤滑油添加劑（不是極壓潤滑劑）<br>
              它是承受摩擦受力金屬表面的先進處理劑<br>
              P18=iphone<br>
              極壓潤滑劑=智障型手機<br>
              因此，它可以與所有類型的油品相容，而不會形成油泥/膠等有害的沉積物<br>
              其實，無需深入研究P 18中過多的技術細節，我們又不是在開發戰鬥機或核子潛艇<br>
              確定P18沒有氯、沒有聚四氟乙烯、沒有鉬等，會產生自由基的傳統成份...<br>
              P 18可用於所有品牌的四行程和二行程引擎<br>
              （包括轉子引擎，自然進氣或渦輪或機械增壓引擎，不論其為汽油/柴油/油電混合）<br>
              變速箱、車橋、液壓泵<br>
              P 18不是油添加劑，它是摩擦金屬的表面處理。<br>
              因此，它可以與所有油一起使用。<br>
              P 18不含鐵氟龍、金屬粉、有機鉬、二硫化鉬及氯化腊，添加物保證不會產生積碳或沉澱物<br>
              P 18可用於所有品牌的所有4行程和2行程發動機，<br>
              包括旋轉發動機，齒輪箱（小心CVT齒輪箱不可以加P18 : "Lineartronic" (Subaru), "Xtronic" (Jatco, Nissan, Renault), INVECS-III (Mitsubishi), Multitronic (Volkswagen, Audi), "Autotronic" (Mercedes-Benz)  IVT (Hyundai, Kia).)<br>
              (DSG齒輪箱可以加P18 謳歌：順序運動換擋 阿爾法羅密歐：Sportronic、Q-Tronic 阿斯頓馬丁：Touchtronic 寶馬：Steptronic 克萊斯勒/道奇/吉普：AutoStick 雪鐵龍：Sensodrive 福特（澳大利亞）：連續運動轉變 本田：iShift、S-matic、MultiMatic 現代：Shiftronic、HIVEC H-Matic 英菲尼迪：手動換檔模式 捷豹：博世®機電一體化 起亞：Steptronic 藍旗亞：Comforttronic 路虎：CommandShift 雷克薩斯：E-Shift 馬自達：運動 AT 梅賽德斯-奔馳：TouchShift MG-Rover：Steptronic 三菱：INVECS、INVECS II、Sportronic、Tiptronic 日產：Tiptronic 歐寶/沃克斯豪爾：Easytronic 標致：2Tronic 龐蒂亞克：TAPshift 薩博：Sentronic 斯巴魯：Sportshift（Prodrive Ltd. 開發的系統） 聰明：Softip 沃爾沃：Geartronic)，軸，液壓泵和液壓泵和氣缸，<br>
              切割油，壓縮機，用於機床和3D打印機的滑道。<br>
              <br>
              有效的提升它們的工作效率<br>
              每次更換機油後，您可以重新將P 18加入機油中.<br>
              對於新車來說，要等到原廠指示的引擎磨合期結束後，才能添加P 18，引擎的磨合對引擎的壽命與工作效率至關重要！<br>
              P18是非常強大先進的減摩抗磨技術<br>
              因此，您必須耐心等待，否則引擎的零件公差將需要更長的時間才能自行磨合完成。<br>
              使用指南： <br>
              通常情況：一般在機油內加入 P18 的比例為 2%~4%，汽柴油車皆可 使用。 發動機：對於曲軸箱，添加 200 毫升的 P18 到 4-6 公升的油， 對於較大的發動機機油儲備，每公升的油添加 40 至 50 毫升的 P18。 齒輪箱：每公升油添加 50 毫升的 P18。 液壓：每公升油添加 30-60 毫升的 P18。<br>
              容量：5L,250ml,200ml,100ml,50ml<br>
              原產地：法國           
            `,
            imageUrl: 'assets/images/products/P18.png',
            externalLinks: [
              { imageUrl: 'assets/images/mecarun-icon.png', externalUrl: 'https://www.mecarun.fr'},
              { imageUrl: 'assets/images/ruten-icon.png', externalUrl: 'https://www.ruten.com.tw/item/show?22120517100641'},
              { imageUrl: 'assets/images/shopee-icon.png', externalUrl: 'https://shopee.tw/《法國進口》Méca-run-C99汽油-是降低消耗和節約能源的標杆-清潔°預防°潤滑°省油環保°可提升馬力-i.1403035.5492878203?position=1'},
              { imageUrl: 'assets/images/pcstore-icon.png', externalUrl: 'https://seller.pcstore.com.tw/S167293963/C1439691388.htm'},
            ]
          }
        ], [
          'en',{
            uuid: 'PRODUCT_KEY_UUID_0',
            name: 'Product Name',
            price: '123',
            description: 'description. description. description. description. description.',
            imageUrl: '',
            externalLinks: []
          }
        ]
      ])
    }
  ]);

  readProductKeys = () => {
    return this.productKeys$;
  }

  readProduct = (uuid: string): Observable<LanguagePackage<Product>|null> => {
    return this.products$.pipe(
      map(products => products.find(product => product.uuid === uuid)),
      map(product => product ? product : null)
    );
  }
} 