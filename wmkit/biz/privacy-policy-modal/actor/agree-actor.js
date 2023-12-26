import {
  Actor,
  Action
} from 'plume2';
const content =
  '<div class="agree-box"><p style="text-align: center;"><span style="color: rgb(0, 0, 0);"><strong><span style="color: rgb(0, 0, 0); font-size: 20px;">会员注册协议</span></strong></span></p><p style="text-align: center;"><br></p><p><span style="color: rgb(0, 0, 0);">尊敬的用户，欢迎您注册成为本网站用户。在注册前请您仔细阅读如下服务条款：</span></p><p><span style="color: rgb(0, 0, 0);">本服务协议双方为本网站与本网站用户，本服务协议具有合同效力。</span></p><p><span style="color: rgb(0, 0, 0);">您确认本服务协议后，本服务协议即在您和本网站之间产生法律效力。请您务必在注册之前认真阅读全部服务协议内容，如有任何疑问，可向本网站咨询。</span></p><p><span style="color: rgb(0, 0, 0);">无论您事实上是否在注册之前认真阅读了本服务协议，只要您点击协议正本下方的"注册"按钮并按照本网站注册程序成功注册为用户，您的行为仍然表示您同意并签署了本服务协议。</span></p><p><span style="color: rgb(0, 0, 0);">1．本网站服务条款的确认和接纳</span></p><p><span style="color: rgb(0, 0, 0);">本网站各项服务的所有权和运作权归本网站拥有。</span></p><p><span style="color: rgb(0, 0, 0);">2．用户必须：</span></p><p><span style="color: rgb(0, 0, 0);">(1)自行配备上网的所需设备， 包括个人电脑、调制解调器或其他必备上网装置。</span></p><p><span style="color: rgb(0, 0, 0);">(2)自行负担个人上网所支付的与此服务有关的电话费用、 网络费用。</span></p><p><span style="color: rgb(0, 0, 0);">3．用户在本网站上交易平台上不得发布下列违法信息：</span></p><p><span style="color: rgb(0, 0, 0);">(1)反对宪法所确定的基本原则的；</span></p><p><span style="color: rgb(0, 0, 0);">(2).危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</span></p><p><span style="color: rgb(0, 0, 0);">(3).损害国家荣誉和利益的；</span></p><p><span style="color: rgb(0, 0, 0);">(4).煽动民族仇恨、民族歧视，破坏民族团结的；</span></p><p><span style="color: rgb(0, 0, 0);">(5).破坏国家宗教政策，宣扬邪教和封建迷信的；</span></p><p><span style="color: rgb(0, 0, 0);">(6).散布谣言，扰乱社会秩序，破坏社会稳定的；</span></p><p><span style="color: rgb(0, 0, 0);">(7).散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</span></p><p><span style="color: rgb(0, 0, 0);">(8).侮辱或者诽谤他人，侵害他人合法权益的；</span></p><p><span style="color: rgb(0, 0, 0);">(9).含有法律、行政法规禁止的其他内容的。</span></p><p><span style="color: rgb(0, 0, 0);">4． 有关个人资料</span></p><p><span style="color: rgb(0, 0, 0);">用户同意：</span></p><p><span style="color: rgb(0, 0, 0);">(1) 提供及时、详尽及准确的个人资料。</span></p><p><span style="color: rgb(0, 0, 0);">(2).同意接收来自本网站的信息。</span></p><p><span style="color: rgb(0, 0, 0);">(3) 不断更新注册资料，符合及时、详尽准确的要求。所有原始键入的资料将引用为注册资料。</span></p><p><span style="color: rgb(0, 0, 0);">(4)本网站不公开用户的姓名、地址、电子邮箱和笔名，以下情况除外：</span></p><p><span style="color: rgb(0, 0, 0);">（a）用户授权本网站透露这些信息。</span></p><p><span style="color: rgb(0, 0, 0);">（b）相应的法律及程序要求本网站提供用户的个人资料。如果用户提供的资料包含有不正确的信息，本网站保留结束用户使用本网站信息服务资格的权利。</span></p><p><span style="color: rgb(0, 0, 0);">5. 用户在注册时应当选择稳定性及安全性相对较好的电子邮箱，并且同意接受并阅读本网站发往用户的各类电子邮件。如用户未及时从自己的电子邮箱接受电子邮件或因用户电子邮箱或用户电子邮件接收及阅读程序本身的问题使电子邮件无法正常接收或阅读的，只要本网站成功发送了电子邮件，应当视为用户已经接收到相关的电子邮件。电子邮件在发信服务器上所记录的发出时间视为送达时间。</span></p><p><span style="color: rgb(0, 0, 0);">6． 服务条款的修改</span></p><p><span style="color: rgb(0, 0, 0);">本网站有权在必要时修改服务条款，本网站服务条款一旦发生变动，将会在重要页面上提示修改内容。如果不同意所改动的内容，用户可以主动取消获得的本网站信息服务。如果用户继续享用本网站信息服务，则视为接受服务条款的变动。本网站保留随时修改或中断服务而不需通知用户的权利。本网站行使修改或中断服务的权利，不需对用户或第三方负责。</span></p><p><span style="color: rgb(0, 0, 0);">7． 用户隐私制度</span></p><p><span style="color: rgb(0, 0, 0);">尊重用户个人隐私是本网站的一项基本政策。所以，本网站一定不会在未经合法用户授权时公开、编辑或透露其注册资料及保存在本网站中的非公开内容，除非有法律许可要求或本网站在诚信的基础上认为透露这些信息在以下四种情况是必要的：</span></p><p><span style="color: rgb(0, 0, 0);">(1) 遵守有关法律规定，遵从本网站合法服务程序。</span></p><p><span style="color: rgb(0, 0, 0);">(2) 保持维护本网站的商标所有权。</span></p><p><span style="color: rgb(0, 0, 0);">(3) 在紧急情况下竭力维护用户个人和社会大众的隐私安全。</span></p><p><span style="color: rgb(0, 0, 0);">(4)符合其他相关的要求。</span></p><p><span style="color: rgb(0, 0, 0);">本网站保留发布会员人口分析资询的权利。</span></p><p><span style="color: rgb(0, 0, 0);">8．用户的帐号、密码和安全性</span></p><p><span style="color: rgb(0, 0, 0);">你一旦注册成功成为用户，你将得到一个密码和帐号。如果你不保管好自己的帐号和密码安全，将负全部责任。另外，每个用户都要对其帐户中的所有活动和事件负全责。你可随时根据指示改变你的密码，也可以结束旧的帐户重开一个新帐户。用户同意若发现任何非法使用用户帐号或安全漏洞的情况，请立即通告本网站。</span></p><p><span style="color: rgb(0, 0, 0);">9. 物流配送</span></p><p><span style="color: rgb(0, 0, 0);">因如下情况造成订单延迟或无法配送等，本站不承担延迟配送的责任：</span></p><p><span style="color: rgb(0, 0, 0);">（1）用户提供的信息错误、地址不详细等原因导致的；</span></p><p><span style="color: rgb(0, 0, 0);">（2）货物送达后无人签收，导致无法配送或延迟配送的；</span></p><p><span style="color: rgb(0, 0, 0);">（3）情势变更因素导致的；</span></p><p><span style="color: rgb(0, 0, 0);">（4）不可抗力因素导致的，例如：自然灾害、交通戒严、突发战争等。</span></p><p><span style="color: rgb(0, 0, 0);">10． 拒绝提供担保</span></p><p><span style="color: rgb(0, 0, 0);">用户明确同意信息服务的使用由用户个人承担风险。 本网站不担保服务不会受中断，对服务的及时性，安全性，出错发生都不作担保，但会在能力范围内，避免出错。</span></p><p><span style="color: rgb(0, 0, 0);">11．有限责任</span></p><p><span style="color: rgb(0, 0, 0);">本网站对任何直接、间接、偶然、特殊及继起的损害不负责任，这些损害来自：不正当使用本网站服务，或用户传送的信息不符合规定等。这些行为都有可能导致本网站形象受损，所以本网站事先提出这种损害的可能性，同时会尽量避免这种损害的发生。</span></p><p><span style="color: rgb(0, 0, 0);">12．信息的储存及限制</span></p><p><span style="color: rgb(0, 0, 0);">本网站有判定用户的行为是否符合本网站服务条款的要求和精神的权利，如果用户违背本网站服务条款的规定，本网站有权中断其服务的帐号。</span></p><p><span style="color: rgb(0, 0, 0);">13．用户管理</span></p><p><span style="color: rgb(0, 0, 0);">用户必须遵循：</span></p><p><span style="color: rgb(0, 0, 0);">(1) 使用信息服务不作非法用途。</span></p><p><span style="color: rgb(0, 0, 0);">(2) 不干扰或混乱网络服务。</span></p><p><span style="color: rgb(0, 0, 0);">(3) 遵守所有使用服务的网络协议、规定、程序和惯例。用户的行为准则是以因特网法规，政策、程序和惯例为根据的。</span></p><p><span style="color: rgb(0, 0, 0);">14．保障</span></p><p><span style="color: rgb(0, 0, 0);">用户同意保障和维护本网站全体成员的利益，负责支付由用户使用超出服务范围引起的律师费用，违反服务条款的损害补偿费用，其它人使用用户的电脑、帐号和其它知识产权的追索费。</span></p><p><span style="color: rgb(0, 0, 0);">15．结束服务</span></p><p><span style="color: rgb(0, 0, 0);">用户或本网站可随时根据实际情况中断一项或多项服务。本网站不需对任何个人或第三方负责而随时中断服务。用户若反对任何服务条款的建议或对后来的条款修改有异议，或对本网站服务不满，用户可以行使如下权利：</span></p><p><span style="color: rgb(0, 0, 0);">(1) 不再使用本网站信息服务。</span></p><p><span style="color: rgb(0, 0, 0);">(2) 通知本网站停止对该用户的服务。</span></p><p><span style="color: rgb(0, 0, 0);">结束用户服务后，用户使用本网站服务的权利马上中止。从那时起，用户没有权利，本网站也没有义务传送任何未处理的信息或未完成的服务给用户或第三方。</span></p><p><span style="color: rgb(0, 0, 0);">16．通告</span></p><p><span style="color: rgb(0, 0, 0);">所有发给用户的通告都可通过重要页面的公告或电子邮件或常规的信件传送。服务条款的修改、服务变更、或其它重要事件的通告都会以此形式进行。</span></p><p><span style="color: rgb(0, 0, 0);">17．信息内容的所有权</span></p><p><span style="color: rgb(0, 0, 0);">本网站定义的信息内容包括：文字、软件、声音、相片、录象、图表；在广告中全部内容；本网站为用户提供的其它信息。所有这些内容受版权、商标、标签和其它财产所有权法律的保护。所以，用户只能在本网站和广告商授权下才能使用这些内容，而不能擅自复制、再造这些内容、或创造与内容有关的派生产品。</span></p><p><span style="color: rgb(0, 0, 0);">18．法律</span></p><p><span style="color: rgb(0, 0, 0);">本网站信息服务条款要与中华人民共和国的法律解释一致。用户和本网站一致同意服从本网站所在地有管辖权的法院管辖。如发生本网站服务条款与中华人民共和国法律相抵触时，则这些条款将完全按法律规定重新解释，而其它条款则依旧保持对用户的约束力。</span></p><p><br></p></div>';
export default class AgreeActor extends Actor {
  defaultState() {
    return {
      registerContent: content,
        showAgreement: false,
        privacyPolicyContent: '',
        privacyPolicyPop: '',
        privacyModalVisible: null,
        showFlag: '',
        privacyPolicyId: '',
        showPrivacyModal: false,

    };
  }
  // 注册协议
  @Action('agree:registerContent')
  registerContent(state, res) {
    const registerContent = res.registerContent;
    return state.set('registerContent', registerContent);
  }

  //隐私政策
  @Action('agree:privacyPolicyContent')
  privacyPolicyContentContent(state, privacyPolicyContent) {
      return state.set('privacyPolicyContent', privacyPolicyContent);
  }

  //1 展示用户协议  2展示隐私政策
  @Action('agree:showFlag')
  setShowFlag(state, res) {
      return state.set('showFlag', res);
  }


  //是否展示用户协议页面
  @Action('agree:showAgreement')
  setShowAgreement(state, showAgreement) {
      return state.set('showAgreement', showAgreement);
  }


  //展示隐私政策弹窗内容
  @Action('agree:privacyPolicyPop')
  setPrivacyPolicyPop(state, privacyPolicyPop) {
    return state.set('privacyPolicyPop', privacyPolicyPop);
  }

  //展示隐私政策弹窗
  @Action('agree:privacyModalVisible')
  setPrivacyModalVisible(state, privacyModalVisible) {
    return state.set('privacyModalVisible', privacyModalVisible);
  }

  //隐私政策ID
  @Action('agree:privacyPolicyId')
  setPrivacyPolicyId(state, privacyPolicyId) {
    return state.set('privacyPolicyId', privacyPolicyId);
  }

  //展示隐私政策功能
  @Action('agree:showPrivacyModal')
  setShowPrivacyModal(state, showPrivacyModal) {
    return state.set('showPrivacyModal', showPrivacyModal);
  }


}