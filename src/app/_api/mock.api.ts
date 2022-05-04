import { Injectable } from "@angular/core";
import { getProductUuid, Product, ProductKey } from "src/app/_interfaces/product.interface";
import { ApiInterface } from "./api.interface";
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class Api implements ApiInterface {

  private productKeys: ProductKey[] = [
    {
      uuid: '80dc13d7-6feb-5f48-8bb3-98adc19e7c7c',
      productId: '56b53378-d5d5-43fa-bf2d-1a32899897f7',
      language: 'zh',
      name: 'P18 金屬處理劑',
      price: '250~1100 NTD',
      shortDescription: `
        *.保護金屬機件，提升壽命<br>
        *.增強金屬表面強韌度<br>
        用於發動機、車軸、減速器和增速器的表面。<br>
        降低發動機溫度
      `,
      thumbnailUrl: 'assets/images/products/P18_thumbnail.png'
    }, {
      uuid: '9f1cb967-2ce4-5005-bc10-37ff40d1b640',
      productId: '6e685ccc-0513-4c7e-88f0-f34fd4c92733',
      language: 'zh',
      name: 'C99汽油/柴油',
      price: '160~780 NTD',
      shortDescription: `
        Méca-run C99汽油/柴油 是降低消耗和節約能源的標杆<br>
        清潔°預防°潤滑°省油環保°可提升馬力
      `,
      thumbnailUrl: 'assets/images/products/C99_thumbnail.png'
    }, {
      uuid: 'f137a583-f7a2-5c7b-9272-27a2cc3cc361',
      productId: 'c52d59be-8c1d-4e97-a331-d45f58c4f967',
      language: 'zh',
      name: 'C99 Racing',
      price: '950 NTD',
      shortDescription: `
        Mecarun C99 Racing，添加劑使您的火焰前沿速度超過 600m/秒，以通過爆燃而不是爆轟來提供燃料的全部功率<br>
        照護引擎，也強化
      `,
      thumbnailUrl: 'assets/images/products/C99_racing_thumbnail.png'
    }, {
      uuid: '04cbc95d-a1e8-5eaa-a3b9-1067e8efe197',
      productId: '56b53378-d5d5-43fa-bf2d-1a32899897f7',
      language: 'en',
      name: 'P18 metal treatment agent',
      price: '8~35 USD',
      shortDescription: `
        *.Protect metal parts and prolong life<br>
        *.Enhanced metal surface strength and toughness<br>
        Surfaces for engines, axles, speed reducers and speed increasers. <br>
        reduce engine temperature
      `,
      thumbnailUrl: 'assets/images/products/P18_thumbnail.png'
    }
  ];

  private products: Product[] = [
    Object.assign({
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
        { imageUrl: 'assets/images/shopee-icon.png', externalUrl: 'https://shopee.tw/《法國進口》Méca-run-C99汽油-是降低消耗和節約能源的標杆-清潔°預防°潤滑°省油環保°可提升馬力-i.1403035.5492878203'},
        { imageUrl: 'assets/images/pcstore-icon.png', externalUrl: 'https://seller.pcstore.com.tw/S167293963/C1439691388.htm'},
      ]
    }, this.productKeys[0]),
    Object.assign({
      description: `
        使用 C99 ，發動機更安靜<br>
        隨時保持噴油嘴通暢,汽油燃燒更完全（省油-10%）<br>
        C99  減少二氧化碳排放和燃料消耗<br>
        使用 C99  ，您可以減少電解對的有害影響<br>
        C99阻斷了燃料中的渦電流，現在的車，燃料在管路內流動的速度非常快，這會產生靜電與渦電流，在燃料品質不佳時，這些電子雜訊，的確會影響ECU...<br>
        C99 的抗摩擦功能<br>
        C99去除水垢（碳）段，冠狀活塞，閥門，燃燒室，進氣管道和EGR。 延長壽命並保護催化轉化器。 最大限度地減少新發動機在最佳狀態下的結垢。<br>
        該產品的主要功能是燃燒汽油並減少污染（請參閱經過認證的測試台上的分析）。 減摩和不粘功能將為噴射泵以及直至火區提供保護。 <br>
        這個怎麼運作 ： C99修改燃料分子（碳鏈類型C6）的表面張力，以獲得燃燒/燃料混合物的均勻分佈，從而實現更好的燃燒，從而改變熱機的運行參數。 C 99在任何溫度下（冷熱均可）提高空氣/燃料混合物的速度，氣體混合物更均勻，在點火時刻燃燒速度超快，所有燃料產生能量，您的錢不不再有煙塵和污染。 發現：抗污染技術控制裝置顯示出的Hc和Co穩定減少了4倍。 結果令人難以置信，但這就是事實。 乾淨的引擎消耗少得多： •滿載時可再續航100公里* •節省EGR，FAP或Turbo的更換成本！ •將Euro 3車輛上的發動機污染*減少50％以上。 •抑菌作用（抗菌）。 •抗污染：Co，Co²，Hc，Nox，濁度法（黑煙）。 •EGR閥，微粒過濾器，渦輪。 •電機經過分層處理，以減少發動機堵塞。 <br>
        Méca-run C99是降低消耗和節約能源的標杆。<br>
          92, 95, 98 或 95e10、柴油<br>
        增加扭矩和功率、競爭、電路，<br>
        您的發動機將配得上一級方程式賽車。<br>
        每瓶250毫升足供處理1000公升燃油<br>
        40 升 20 毫升 - 60 升 30 毫升 - 80 升 40 毫升<br>
        產地：法國<br>     
      `,
      imageUrl: 'assets/images/products/C99.png',
      externalLinks: [
        { imageUrl: 'assets/images/mecarun-icon.png', externalUrl: 'https://www.mecarun.fr'},
        { imageUrl: 'assets/images/ruten-icon.png', externalUrl: 'https://www.ruten.com.tw/item/show?22125304134175'},
        { imageUrl: 'assets/images/shopee-icon.png', externalUrl: 'https://shopee.tw/《法國進口》Méca-run-C99汽油-是降低消耗和節約能源的標杆-清潔°預防°潤滑°省油環保°可提升馬力-i.1403035.5792877790'},
        { imageUrl: 'assets/images/pcstore-icon.png', externalUrl: 'https://seller.pcstore.com.tw/S167293963/C1440415246.htm'},
      ]
    }, this.productKeys[1]),
    Object.assign({
      description: `
        C99 Racing推出的專業賽車汽油，就是世界級最專業的賽車汽油濃縮液！大幅增大引擎馬力<br>
        適用於各種，跑車、摩托車，使用汽油引擎之設備。<br>
        目前台灣並沒有販售適用於高壓縮比引擎的賽車汽油。若您使用高壓縮比的引擎，加油站所售一般標號98,95,92汽油並不適用；<br>
        Mecarun C99 Racing推出的專業賽車汽油，就是世界級最專業的賽車汽油濃縮液！<br>
        Mecarun C99 Racing可避免引擎內的不正常燃燒，防止爆震；提升燃油效率，同時有效降低引擎溫度，讓您親身體驗專業賽車燃料的動力與流暢！亦可搭配Mecarun P18 金屬處理劑，讓您愛車進化100%！<br>
        C 99 Racing 用於汽車和摩托車，壓縮率高達 13（這是一級方程式賽車的壓縮率）。<br>
        Mecarun C99 Racing，添加劑使您的火焰前沿速度超過 600m/秒，以通過爆燃而不是爆轟來提供燃料的全部功率<br>
        照護引擎，也強化<br>
        在競技場上，引擎不斷運轉，需要高單位的辛烷值來提升抗爆性，增加燃燒室的潤滑，降低機件間的摩擦力；<br>
        Mecarun C99 Racing 的作用即是完全潤滑，改善燃燒室條件，防護引擎的同時,讓燃燒效率提升,大幅增大引擎馬力，讓駕駛的我們時實質感受來自引擎的能量。<br>
        防止引擎爆震，有效保護引擎<br>
        。不損傷車輛氧濃度傳感器與觸媒轉化器<br>
        。充分釋放引擎馬力，提升燃燒效能。<br>
        。有效降低引擎溫度，防止燃油過早氣化<br>
        。極致提昇引擎動力輸出 與加速表現<br>
        。極致改善油耗提升每公升汽油可行駛里程<br>
        。可依照不同需求，以不同比例來混和<br>
        10 升汽油98,95,92使用 20 毫升Mecarun C99 Racing<br>
        <br>
        容量：250ML<br>
        產地：法國<br>           
      `,
      imageUrl: 'assets/images/products/C99_racing.png',
      externalLinks: [
        { imageUrl: 'assets/images/mecarun-icon.png', externalUrl: 'https://www.mecarun.fr'},
        { imageUrl: 'assets/images/ruten-icon.png', externalUrl: 'https://www.ruten.com.tw/item/show?22128716636532'},
        { imageUrl: 'assets/images/shopee-icon.png', externalUrl: 'https://shopee.tw/Mecarun-C99-Racing推出的專業賽車汽油辛烷值濃，就是世界級最專業的賽車汽油濃縮液！-i.1403035.8490191326'},
        { imageUrl: 'assets/images/pcstore-icon.png', externalUrl: 'https://seller.pcstore.com.tw/S167293963/C1440415258.htm'},
      ]
    }, this.productKeys[2]),
    Object.assign({
      description: `
        What is P18? <br>
        P 18 is not a lubricant additive in conventional technology (not an extreme pressure lubricant)<br>
        It is an advanced treatment agent for metal surfaces subjected to frictional forces<br>
        P18=iphone<br>
        Extreme pressure lubricant=mentally handicapped mobile phone<br>
        Therefore, it is compatible with all types of oils without forming harmful deposits like sludge/gum<br>
        Actually, no need to delve into too many technical details in P 18, we are not developing fighter jets or nuclear submarines<br>
        Determined that P18 has no chlorine, no teflon, no molybdenum, etc., traditional ingredients that generate free radicals...<br>
        P 18 is available for all brands of four-stroke and two-stroke engines<br>
        (including rotary, naturally aspirated or turbo or supercharged engines, whether petrol/diesel/gasoline hybrid)<br>
        Transmission, Axle, Hydraulic Pump<br>
        P 18 is not an oil additive, it is a surface treatment of friction metal. <br>
        Therefore, it can be used with all oils. <br>
        P 18 does not contain Teflon, metal powder, organic molybdenum, molybdenum disulfide and chlorinated wax, and the additives ensure that no carbon deposits or sediments will be produced<br>
        P 18 is available for all 4-stroke and 2-stroke engines of all brands,<br>
        Including rotary engine, gearbox (be careful not to add P18 to CVT gearbox: "Lineartronic" (Subaru), "Xtronic" (Jatco, Nissan, Renault), INVECS-III (Mitsubishi), Multitronic (Volkswagen, Audi), "Autotronic " (Mercedes-Benz) IVT (Hyundai, Kia).)<br>
        (DSG gearbox can add P18 Acura: Sequential Sport Shift Alfa Romeo: Sporttronic, Q-Tronic Aston Martin: Touchtronic BMW: Steptronic Chrysler/Dodge/Jeep: AutoStick Citroen: Sensodrive Ford (Australia): Continuous Sport Shift Honda: iShift, S-matic, MultiMatic Hyundai: Shitronic, HIVEC H-Matic Infiniti: Manual Shift Mode Jaguar: Bosch® Mechatronics Kia: Steptronic Lancia: Comforttronic Land Rover: CommandShift Lexus: E-Shift Mazda: Sport AT Mercedes Dess-Benz: TouchShift MG-Rover: Steptronic Mitsubishi: INVECS, INVECS II, Sportron, Tiptronic Nissan: Tiptronic Opel/Vauxhall: Easytronic Peugeot: 2Tronic Pontiac: TAPshift Saab: Sentronic Subaru: Sportshift (Prodrive Ltd . Developed system) Smart: Softip Volvo: Geartronic), axles, hydraulic pumps and hydraulic pumps and cylinders, <br>
        Cutting oils, compressors, slides for machine tools and 3D printers. <br>
        <br>
        Effectively improve their work efficiency<br>
        You can re-add P 18 to the oil after each oil change.<br>
        For new cars, P 18 can only be added after the engine running-in period indicated by the original factory is over. The running-in of the engine is very important to the life and working efficiency of the engine! <br>
        P18 is very powerful advanced anti-friction and anti-wear technology<br>
        So you have to be patient, or the engine's part tolerances will take longer to break in on its own. <br>
        User Guide: <br>
        Normal situation: Generally, the proportion of P18 added to the oil is 2%~4%, which can be used in gasoline and diesel vehicles. Engine: For crankcase, add 200 ml of P18 to 4-6 liters of oil, for larger engine oil reserves, add 40 to 50 ml of P18 per liter of oil. Gearbox: Add 50ml of P18 per litre of oil. Hydraulic: Add 30-60 ml of P18 per liter of oil. <br>
        Capacity: 5L, 250ml, 200ml, 100ml, 50ml<br>
        Origin: France
      `,
      imageUrl: 'assets/images/products/P18.png',
      externalLinks: [
        { imageUrl: 'assets/images/mecarun-icon.png', externalUrl: 'https://www.mecarun.fr'},
        { imageUrl: 'assets/images/ruten-icon.png', externalUrl: 'https://www.ruten.com.tw/item/show?22120517100641'},
        { imageUrl: 'assets/images/shopee-icon.png', externalUrl: 'https://shopee.tw/《法國進口》Méca-run-C99汽油-是降低消耗和節約能源的標杆-清潔°預防°潤滑°省油環保°可提升馬力-i.1403035.5492878203'},
        { imageUrl: 'assets/images/pcstore-icon.png', externalUrl: 'https://seller.pcstore.com.tw/S167293963/C1439691388.htm'},
      ]
    }, this.productKeys[3])
  ];

  readProductKeys = (language: string) => {
    console.log('api readProductKeys');
    return Promise.resolve([...this.productKeys.filter(productKey => productKey.language === language)] as ProductKey[]);
  }

  createProductKey = (productKey: ProductKey) => {
    console.log('api createProductKey');
    productKey.productId = uuidv4();
    productKey.uuid = getProductUuid(productKey.productId, productKey.language);
    this.productKeys.push(productKey);
    return Promise.resolve({...productKey} as ProductKey);
  }

  updateProductKey = (productKey: ProductKey) => {
    console.log('api updateProductKey');
    const index = this.productKeys.findIndex(productKeyElement => productKeyElement.uuid === productKey.uuid);
    if (index === -1) {
      return Promise.reject('NOT_EXIST');
    } else {
      this.productKeys.splice(index, 1);
      this.productKeys.push(productKey);
      return Promise.resolve({...productKey} as ProductKey);
    }
  };

  deleteProductKey = (uuid: string) => {
    console.log('api deleteProductKey');
    const index = this.productKeys.findIndex(productKeyElement => productKeyElement.uuid === uuid);
    if (index === -1) {
      return Promise.reject('NOT_EXIST');
    } else {
      this.productKeys.splice(index, 1);
      return Promise.resolve();
    }
  };

  readProduct = (uuid: string) => {
    console.log('api readProduct');
    const index = this.products.findIndex(product => product.uuid === uuid);
    if (index === -1) {
      return Promise.reject('NOT_EXSIT');
    } else {
      return Promise.resolve({...this.products[index]} as Product);
    }
  }

  createProduct = (product: Product) => {
    console.log('api createProduct');
    this.products.push(product);
    return Promise.resolve({...product} as Product);
  };

  updateProduct = (product: Product) => {
    console.log('api updateProduct');
    const index = this.products.findIndex(productElement => productElement.uuid === product.uuid && productElement.language === product.language);
    if (index === -1) {
      return Promise.reject('NOT_EXIST');
    } else {
      this.products.splice(index, 1);
      this.products.push(product);
      return Promise.resolve({...product} as Product);
    }
  };

  deleteProduct = (uuid: string) => {
    console.log('api deleteProduct');
    const index = this.products.findIndex(productElement => productElement.uuid === uuid);
    if (index === -1) {
      return Promise.reject('NOT_EXIST');
    } else {
      this.products.splice(index, 1);
      return Promise.resolve();
    }
  };
} 