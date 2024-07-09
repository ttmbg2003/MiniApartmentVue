<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="contract-form">
    <div class="header">
      <p class="centered-text">
        CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br />Độc lập – Tự do – Hạnh phúc<br />-o0o-
      </p>
      <p class="centered-text">
        HỢP ĐỒNG THUÊ CĂN HỘ CHUNG CƯ MINI<br />(Số: 3./HĐTCHNCC)
      </p>
    </div>

    <div class="content">
      <p>
        Căn cứ Luật dân sự số 91/2015/QH13 và Luật nhà ở số 65/2014/QH13 của
        nước Cộng hòa Xã hội Chủ nghĩa Việt Nam ban hành năm 2015;
      </p>
      <p>Căn cứ vào pháp luật khác có liên quan;</p>
      <p>Căn cứ vào nhu cầu và khả năng của các bên;</p>

      <p>
        Hôm nay, <input type="date" v-model="contract.date" name="date" />., tại
        địa chỉ số 1 đường Phú Mỹ, Mỹ Đình, Nam Từ Liêm, Hà Nội, chúng tôi gồm
        có:
      </p>

      <p>
        ĐẠI DIỆN BÊN CHO THUÊ (BÊN A):<br />
        Ông/bà: Nguyễn Văn D Sinh ngày: 01/01/198x<br />
        CMND/CCCD số: 02209800xxxx Ngày cấp: 01/01/2022 Nơi cấp: Cục cảnh sát<br />
        Hộ khẩu: số 1 đường Trần Bình, Mỹ Đình, Nam Từ Liêm, Hà Nội<br />
        Địa chỉ: số 1 đường Phú Mỹ, Mỹ Đình, Nam Từ Liêm, Hà Nội<br />
        Điện thoại: 0123 456 899<br />
        Là chủ sở hữu nhà ở: số 1 đường Phú Mỹ, Mỹ Đình, Nam Từ Liêm, Hà Nội
      </p>

      <p>
        ĐẠI DIỆN BÊN THUÊ (BÊN B):<br />
        Ông/bà: <input type="text" v-model="contract.fullName" /><br />
        CMND/CCCD: <input type="number" v-model="contract.citizenId" /> Ngày
        cấp: <input type="date" v-model="contract.dated" /><br />
        Nơi cấp: <input type="text" v-model="contract.placeOfCitizenId" /><br />
        Hộ khẩu: <input type="text" v-model="contract.placeOfPermanet" /><br />
        Số điện thoại: <input type="number" v-model="contract.contact" />
      </p>

      <p>Hai bên cùng thỏa thuận ký hợp đồng với những nội dung sau:</p>

      <h3>ĐIỀU 1: ĐỐI TƯỢNG VÀ NỘI DUNG CỦA HỢP ĐỒNG</h3>
      <p>
        1.1. Bên A cho bên B thuê căn hộ số:
        <input type="number" v-model="contract.roomId" /><br />
        Tại: số 1 đường Phú Mỹ, Mỹ Đình, Nam Từ Liêm, Hà Nội<br />
        Để sử dụng vào mục đích: để ở (không trái với quy định pháp luật)<br />
        1.2. Quyền sở hữu của bên A đối với căn hộ cụ thể như sau:<br />
        a) Địa chỉ căn hộ: số 1 đường Phú Mỹ, Mỹ Đình, Nam Từ Liêm, Hà Nội<br />
        b) Căn hộ số: <input type="number" v-model="contract.roomId" /><br />
        d) Tổng diện tích sàn căn hộ là:
        <input type="number" v-model="contract.totalArea" /> m2; diện tích đất
        gắn liền với căn hộ là:
        <input type="number" v-model="contract.landArea" /> m2<br />
        (sử dụng chung là:
        <input type="number" v-model="contract.publicArea" /> m2; sử dụng riêng
        là: <input type="number" v-model="contract.privateArea" /> m2).<br />
        e) Trang thiết bị gắn liền với căn hộ:
        <input type="text" v-model="contract.device" /><br />
        f) Nguồn gốc sở hữu:
        <input type="text" v-model="contract.ownerOrgirin" /><br />
        g) Những hạn chế về quyền sở hữu căn hộ (nếu có):
        <input type="text" v-model="contract.ownerLimit" />
      </p>

      <h3>
        1.3. Thông tin người thuê (bao gồm người đại diện và người ở cùng):
      </h3>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Full Name</th>
            <th>Gender</th>
            <th>D.O.B</th>
            <th>Mobile No</th>
            <th>Email ID</th>
            <th>Career</th>
            <th>License plate</th>
            <th>Vehicle Type</th>
            <th>Vehicle Color</th>
            <th>Relationship with Representative</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td><input type="text" v-model="contract.fullName" /></td>
            <td>
              <select v-model="contract.gender">
                <option value="0">Male</option>
                <option value="1">Female</option>
              </select>
            </td>
            <td><input type="date" v-model="contract.dob" /></td>
            <td><input type="number" v-model="contract.contact" /></td>
            <td><input type="email" v-model="contract.email" /></td>
            <td><input type="text" v-model="contract.career" /></td>
            <td><input type="text" v-model="contract.licensePlate" /></td>
            <td><input type="text" v-model="contract.vehicleType" /></td>
            <td><input type="text" v-model="contract.vehicleColor" /></td>
            <td>
              <select v-model="contract.relationship">
                <option value="1">Family</option>
                <option value="2">Friend</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      ĐIỀU 2: GI&Aacute; THU&Ecirc;, PHƯƠNG THỨC V&Agrave; THỜI HẠN THANH
      TO&Aacute;N<br />2.1. Gi&aacute; cho thu&ecirc; ph&ograve;ng ở l&agrave;
      <input type="number" name="rentalFee" v-model="contract.rentalFee" /> đồng
      Việt Nam/01 th&aacute;ng.<br />(Bằng chữ:<br />2.2. C&aacute;c chi
      ph&iacute; sử dụng điện, nước, điện thoại v&agrave; c&aacute;c dịch vụ
      kh&aacute;c do B&ecirc;n B thanh to&aacute;n cho b&ecirc;n cung cấp điện,
      nước, điện thoại v&agrave; c&aacute;c cơ quan cung cấp dịch vụ
      kh&aacute;c.<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      - Điện: 3.800 VND/Kwh<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      - Nước: 35.000 VND/m3<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      - Wifi: 100.000 VND/ph&ograve;ng<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      - Dịch vụ: 130.000 VND/người/ph&ograve;ng (bao gồm chi ph&iacute;:
      &aacute;nh s&aacute;ng, m&aacute;y giặt, gửi xe, vệ sinh, camera, an
      ninh)<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      - Tiền cọc:
      <input
        type="number"
        name="securityDeposite"
        v-model="contract.rentalFee"
      />VND (tương đương với 1 th&aacute;ng tiền thu&ecirc; ph&ograve;ng)<br />2.3.
      Phương thức thanh to&aacute;n: thanh to&aacute;n bằng tiền Việt Nam
      th&ocirc;ng qua h&igrave;nh thức: chuyển khoản<br />2.4. Thời hạn thanh
      to&aacute;n: B&ecirc;n B trả tiền thu&ecirc; nh&agrave; trong khoảng thời
      gian từ ng&agrave;y 01 đến ng&agrave;y 05 h&agrave;ng th&aacute;ng.
    </p>

    <p>
      ĐIỀU 3: THỜI ĐIỂM GIAO NHẬN V&Agrave; THỜI HẠN THU&Ecirc; NH&Agrave; Ở<br />3.1.
      Thời điểm giao nhận nh&agrave; ở (chuyển v&agrave;o) l&agrave;
      <input
        type="date"
        name="moveIn"
        v-model="contract.moveinDate"
      /><br />3.2. Thời hạn cho thu&ecirc; nh&agrave; ở l&agrave; .......... năm
      (......... th&aacute;ng), kể từ
      <input type="date" name="signinDate" v-model="contract.signinDate" /> đến
      <input type="date" name="expireDate" v-model="contract.expireDate" />
    </p>

    <p>
      ĐIỀU 4: QUYỀN V&Agrave; NGHĨA VỤ CỦA B&Ecirc;N A<br />4.1. Quyền của
      b&ecirc;n A:<br />a) Y&ecirc;u cầu b&ecirc;n B trả đủ tiền thu&ecirc;
      nh&agrave; theo đ&uacute;ng thỏa thuận đ&atilde; cam kết;<br />b)
      Y&ecirc;u cầu b&ecirc;n B c&oacute; tr&aacute;ch nhiệm sửa chữa c&aacute;c
      hư hỏng v&agrave; bồi thường thiệt hại do lỗi của b&ecirc;n B g&acirc;y ra
      (nếu c&oacute;);<br />c) Y&ecirc;u cầu b&ecirc;n B thanh to&aacute;n đủ số
      tiền thu&ecirc; căn hộ (đối với thời gian đ&atilde; thu&ecirc;) v&agrave;
      giao lại căn hộ trong c&aacute;c trường hợp c&aacute;c b&ecirc;n thỏa
      thuận chấm dứt hợp đồng thu&ecirc; căn hộ trước thời hạn;<br />d) Bảo
      tr&igrave;, cải tạo căn hộ;<br />e) Đơn phương chấm dứt thực hiện hợp đồng
      thu&ecirc; khi b&ecirc;n B c&oacute; một trong c&aacute;c h&agrave;nh vi
      sau đ&acirc;y:
    </p>

    <p>
      - Kh&ocirc;ng trả tiền thu&ecirc; căn hộ theo thỏa thuận trong hợp đồng
      li&ecirc;n tiếp trong ba th&aacute;ng trở l&ecirc;n m&agrave; kh&ocirc;ng
      c&oacute; l&yacute; do ch&iacute;nh đ&aacute;ng;<br />- Sử dụng căn hộ
      kh&ocirc;ng đ&uacute;ng mục đ&iacute;ch như đ&atilde; thoả thuận;<br />-
      Cố &yacute; l&agrave;m hư hỏng căn hộ cho thu&ecirc;;<br />- Sửa chữa, cải
      tạo, đổi căn hộ đang thu&ecirc; hoặc cho người kh&aacute;c thu&ecirc; lại
      căn hộ đang thu&ecirc; m&agrave; kh&ocirc;ng c&oacute; sự đồng &yacute;
      của b&ecirc;n A căn hộ;<br />- L&agrave;m mất trật tự, vệ sinh m&ocirc;i
      trường, ảnh hưởng nghi&ecirc;m trọng đến sinh hoạt của những người xung
      quanh đ&atilde; được b&ecirc;n A hoặc tổ trưởng tổ d&acirc;n phố, trưởng
      th&ocirc;n, l&agrave;ng, ấp, bản, bu&ocirc;n, phum, s&oacute;c lập
      bi&ecirc;n bản đến lần thứ ba m&agrave; vẫn kh&ocirc;ng khắc phục.<br />f)
      Y&ecirc;u cầu b&ecirc;n B trả lại nh&agrave; khi chấm dứt hợp đồng
      thu&ecirc; theo quy định tại c&aacute;c khoản 1, 2, 4 v&agrave; khoản 6
      Điều 7 của hợp đồng n&agrave;y;<br />4.2. Nghĩa vụ của b&ecirc;n A:<br />a)
      Giao căn hộ v&agrave; trang thiết bị gắn liền với căn hộ (nếu c&oacute;)
      cho b&ecirc;n B đ&uacute;ng thời gian quy định tại khoản 1 Điều 3 của hợp
      đồng n&agrave;y;<br />b) Th&ocirc;ng b&aacute;o cho b&ecirc;n B biết
      c&aacute;c quy định về quản l&yacute; sử dụng căn hộ;<br />c) Bảo đảm cho
      b&ecirc;n B sử dụng ổn định căn hộ trong thời hạn thu&ecirc;;<br />d) Trả
      lại số tiền thu&ecirc; căn hộ m&agrave; b&ecirc;n B đ&atilde; trả trước
      trong trường hợp c&aacute;c b&ecirc;n thỏa thuận chấm dứt hợp đồng
      thu&ecirc; căn hộ trước thời hạn;<br />e) Bảo tr&igrave;, quản l&yacute;
      căn hộ cho thu&ecirc; theo quy định của ph&aacute;p luật về quản l&yacute;
      sử dụng nh&agrave; ở;<br />f) Hướng dẫn, đề nghị b&ecirc;n B thực hiện
      đ&uacute;ng c&aacute;c quy định về quản l&yacute; nh&acirc;n khẩu;<br />g)
      Đơn phương chấm dứt thực hiện hợp đồng thu&ecirc; căn hộ th&igrave; phải
      th&ocirc;ng b&aacute;o cho b&ecirc;n B biết trước &iacute;t nhất một
      th&aacute;ng, trừ trường hợp c&aacute;c b&ecirc;n c&oacute; thoả thuận
      kh&aacute;c.<br />h) Đơn phương chấm dứt hợp đồng thu&ecirc; nh&agrave; ở
      vi phạm quy định tại mục g khoản 4.2 Điều n&agrave;y, nếu g&acirc;y thiệt
      hại th&igrave; phải bồi thường theo quy định của ph&aacute;p luật.
    </p>

    <p>
      ĐIỀU 5: QUYỀN V&Agrave; NGHĨA VỤ CỦA B&Ecirc;N B<br />5.1. Quyền của
      b&ecirc;n B:<br />a) Nhận căn hộ v&agrave; trang thiết bị gắn liền với căn
      hộ (nếu c&oacute;) theo đ&uacute;ng thỏa thuận tại khoản 1 Điều 3 của hợp
      đồng n&agrave;y;<br />b) Y&ecirc;u cầu b&ecirc;n A sửa chữa kịp thời
      c&aacute;c hư hỏng về căn hộ;<br />c) Y&ecirc;u cầu b&ecirc;n A trả lại số
      tiền thu&ecirc; căn hộ m&agrave; b&ecirc;n B đ&atilde; nộp trước trong
      trường hợp chấm dứt hợp đồng thu&ecirc; căn hộ trước thời hạn;<br />d)
      Được đổi căn hộ đang thu&ecirc; với người kh&aacute;c hoặc cho thu&ecirc;
      lại (nếu c&oacute; thỏa thuận);<br />e) Được tiếp tục thu&ecirc; theo
      c&aacute;c điều kiện thoả thuận với b&ecirc;n A trong trường hợp c&oacute;
      thay đổi về chủ sở hữu căn hộ;<br />f) B&ecirc;n B c&oacute; quyền đơn
      phương chấm dứt thực hiện hợp đồng thu&ecirc; căn hộ khi b&ecirc;n A
      c&oacute; một trong c&aacute;c h&agrave;nh vi sau đ&acirc;y:<br />-
      Kh&ocirc;ng sửa chữa căn hộ khi căn hộ c&oacute; hư hỏng nặng;<br />- Tăng
      gi&aacute; cho thu&ecirc; căn hộ bất hợp l&yacute; hoặc tăng gi&aacute;
      m&agrave; kh&ocirc;ng th&ocirc;ng b&aacute;o cho b&ecirc;n B biết trước
      theo thoả thuận;<br />- Khi quyền sử dụng căn hộ bị hạn chế do lợi
      &iacute;ch của người thứ ba.<br />g) C&aacute;c quyền kh&aacute;c do hai
      b&ecirc;n thỏa
      thuận.......................................................................................<br />5.2.
      Nghĩa vụ của b&ecirc;n B:
    </p>

    <p>
      a) Trả đủ tiền thu&ecirc; căn hộ theo đ&uacute;ng thời hạn đ&atilde; cam
      kết trong hợp đồng;<br />b) Sử dụng căn hộ đ&uacute;ng mục đ&iacute;ch;
      c&oacute; tr&aacute;ch nhiệm sửa chữa phần hư hỏng do m&igrave;nh
      g&acirc;y ra;<br />c) Chấp h&agrave;nh đầy đủ c&aacute;c quy định về quản
      l&yacute; sử dụng căn hộ;<br />d) Kh&ocirc;ng được chuyển nhượng hợp đồng
      thu&ecirc; căn hộ hoặc cho người kh&aacute;c thu&ecirc; lại, trừ trường
      hợp được b&ecirc;n A đồng &yacute;;<br />e) Chấp h&agrave;nh c&aacute;c
      quy định về giữ g&igrave;n vệ sinh m&ocirc;i trường v&agrave; an ninh trật
      tự trong khu vực cư tr&uacute;;<br />f) Giao lại căn hộ v&agrave; thanh
      to&aacute;n đủ cho b&ecirc;n A số tiền thu&ecirc; căn hộ c&ograve;n thiếu
      trong trường hợp chấm dứt hợp đồng n&ecirc;u tại c&aacute;c khoản 1, 2, 4
      v&agrave; khoản 6 Điều 7 của hợp đồng n&agrave;y.<br />g) Đơn phương chấm
      dứt thực hiện hợp đồng thu&ecirc; căn hộ th&igrave; phải th&ocirc;ng
      b&aacute;o cho b&ecirc;n A biết trước &iacute;t nhất một th&aacute;ng, trừ
      trường hợp c&aacute;c b&ecirc;n c&oacute; thoả thuận kh&aacute;c.<br />h)
      Đơn phương chấm dứt hợp đồng thu&ecirc; căn hộ vi phạm quy định tại mục g
      khoản 5.2 Điều n&agrave;y, nếu g&acirc;y thiệt hại th&igrave; phải bồi
      thường theo quy định của ph&aacute;p luật.<br />i) Người đại diện
      k&yacute; hợp đồng v&agrave; c&aacute;c th&agrave;nh vi&ecirc;n
      kh&aacute;c sống chung c&ugrave;ng với người đại diện trong căn hộ
      thu&ecirc; (c&oacute; đ&iacute;nh k&egrave;m danh s&aacute;ch như mục 1.3
      Điều 1) đều c&oacute; tr&aacute;ch nhiệm v&agrave; nghĩa vụ giống nhau
      trong việc thực hiện c&aacute;c điều khoản trong hợp đồng n&agrave;y.<br />k)
      C&aacute;c nghĩa vụ kh&aacute;c theo thỏa thuận của hai
      b&ecirc;n......................................................................................
    </p>

    <p>
      ĐIỀU 6: QUYỀN TIẾP TỤC THU&Ecirc; CĂN HỘ<br />6.1. Trường hợp b&ecirc;n A
      chết m&agrave; thời hạn thu&ecirc; căn hộ vẫn c&ograve;n th&igrave;
      b&ecirc;n B được tiếp tục thu&ecirc; đến hết hạn hợp đồng. Người thừa kế
      c&oacute; tr&aacute;ch nhiệm tiếp tục thực hiện hợp đồng thu&ecirc; căn hộ
      đ&atilde; k&yacute; kết trước đ&oacute;, trừ trường hợp c&aacute;c
      b&ecirc;n c&oacute; thoả thuận kh&aacute;c.<br />Trường hợp kh&ocirc;ng
      c&oacute; người thừa kế theo quy định của ph&aacute;p luật th&igrave;
      nh&agrave; ở đ&oacute; thuộc quyền sở hữu nh&agrave; nước v&agrave;
      b&ecirc;n B được tiếp tục thu&ecirc; đến hết hạn hợp đồng.<br />6.2.
      Trường hợp b&ecirc;n A chuyển quyền sở hữu căn hộ đang cho thu&ecirc;
      m&agrave; thời hạn thu&ecirc; căn hộ vẫn c&ograve;n th&igrave; b&ecirc;n B
      được tiếp tục thu&ecirc; đến hết hạn hợp đồng; chủ sở hữu mới căn hộ
      c&oacute; tr&aacute;ch nhiệm tiếp tục thực hiện hợp đồng thu&ecirc; căn hộ
      đ&atilde; k&yacute; kết trước đ&oacute;, trừ trường hợp c&aacute;c
      b&ecirc;n c&oacute; thoả thuận kh&aacute;c.<br />6.3. Khi b&ecirc;n B chết
      m&agrave; thời hạn thu&ecirc; căn hộ vẫn c&ograve;n th&igrave; người
      đ&atilde; c&ugrave;ng ở với b&ecirc;n B được tiếp tục thu&ecirc; đến hết
      hạn hợp đồng thu&ecirc; căn hộ, trừ trường hợp c&aacute;c b&ecirc;n
      c&oacute; thoả thuận kh&aacute;c.
    </p>

    <p>
      ĐIỀU 7: CHẤM DỨT HỢP ĐỒNG THU&Ecirc; NH&Agrave; Ở<br />Việc chấm dứt hợp
      đồng thu&ecirc; nh&agrave; ở được thực hiện khi c&oacute; một trong
      c&aacute;c trường hợp sau:<br />7.1. Hợp đồng thu&ecirc; nh&agrave; ở hết
      hạn m&agrave; c&aacute;c b&ecirc;n kh&ocirc;ng thỏa thuận k&yacute; tiếp;
      trường hợp trong hợp đồng kh&ocirc;ng x&aacute;c định thời hạn th&igrave;
      hợp đồng chấm dứt sau s&aacute;u th&aacute;ng, kể từ ng&agrave;y b&ecirc;n
      A th&ocirc;ng b&aacute;o cho b&ecirc;n B biết việc chấm dứt hợp đồng.<br />7.2.
      C&aacute;c b&ecirc;n thỏa thuận chấm dứt hợp đồng trước thời hạn;<br />7.3.
      Căn hộ cho thu&ecirc; kh&ocirc;ng c&ograve;n;<br />7.4. Căn hộ cho
      thu&ecirc; hư hỏng nặng c&oacute; nguy cơ sập đổ hoặc nằm trong khu vực
      đ&atilde; c&oacute; quyết định thu hồi đất, giải ph&oacute;ng mặt bằng
      hoặc c&oacute; quyết định ph&aacute; dỡ của cơ quan nh&agrave; nước
      c&oacute; thẩm quyền.<br />7.5. B&ecirc;n B chết m&agrave; kh&ocirc;ng
      c&oacute; người đang c&ugrave;ng sinh sống;<br />7.6. Khi một trong hai
      b&ecirc;n đơn phương chấm dứt hợp đồng theo quy định của ph&aacute;p luật.
    </p>

    <p>ĐIỀU 8: CAM KẾT CỦA C&Aacute;C B&Ecirc;N</p>

    <p>
      8.1. B&ecirc;n A cam kết căn hộ cho thu&ecirc; thuộc quyền sở hữu hợp
      ph&aacute;p của m&igrave;nh, kh&ocirc;ng c&oacute; tranh chấp về quyền sở
      hữu, kh&ocirc;ng bị k&ecirc; bi&ecirc;n để thi h&agrave;nh &aacute;n hoặc
      để chấp h&agrave;nh quyết định h&agrave;nh ch&iacute;nh của cơ quan
      nh&agrave; nước c&oacute; thẩm quyền (kh&ocirc;ng thuộc diện bị thu hồi
      hoặc kh&ocirc;ng bị giải tỏa); cam kết căn hộ đảm bảo chất lượng, an
      to&agrave;n cho b&ecirc;n B.<br />8.2. B&ecirc;n B đ&atilde; t&igrave;m
      hiểu kỹ c&aacute;c th&ocirc;ng tin về căn hộ thu&ecirc;.<br />8.3. Việc
      k&yacute; kết hợp đồng n&agrave;y giữa c&aacute;c b&ecirc;n l&agrave;
      ho&agrave;n to&agrave;n tự nguyện, kh&ocirc;ng bị &eacute;p buộc, lừa dối.
      Trong qu&aacute; tr&igrave;nh thực hiện hợp đồng, nếu cần thay đổi hoặc bổ
      sung nội dung của hợp đồng n&agrave;y th&igrave; c&aacute;c b&ecirc;n thỏa
      thuận lập th&ecirc;m phụ lục hợp đồng c&oacute; chữ k&yacute; của hai
      b&ecirc;n, phụ lục hợp đồng c&oacute; gi&aacute; trị ph&aacute;p l&yacute;
      như hợp đồng n&agrave;y.<br />8.4. C&aacute;c b&ecirc;n c&ugrave;ng cam
      kết thực hiện đ&uacute;ng v&agrave; đầy đủ c&aacute;c nội dung đ&atilde;
      thỏa thuận trong hợp đồng.<br />8.5. C&aacute;c cam kết kh&aacute;c (phải
      ph&ugrave; hợp với quy định của ph&aacute;p luật v&agrave; kh&ocirc;ng
      tr&aacute;i đạo đức x&atilde; hội): .................
    </p>

    <p>
      ĐIỀU 9: GIẢI QUYẾT TRANH CHẤP<br />Trường hợp c&aacute;c b&ecirc;n
      c&oacute; tranh chấp về nội dung của hợp đồng n&agrave;y th&igrave; hai
      b&ecirc;n c&ugrave;ng b&agrave;n bạc giải quyết th&ocirc;ng qua thương
      lượng. Trong trường hợp c&aacute;c b&ecirc;n kh&ocirc;ng thương lượng được
      th&igrave; c&oacute; quyền y&ecirc;u cầu T&ograve;a &aacute;n giải quyết
      theo quy định của ph&aacute;p luật.
    </p>

    <p>
      ĐIỀU 10: HIỆU LỰC CỦA HỢP ĐỒNG<br />10.1. Hợp đồng n&agrave;y c&oacute;
      hiệu lực kể từ
      <input
        type="date"
        name="signinDate"
        v-model="contract.signinDate"
      /><br />10.2. Hợp đồng n&agrave;y được lập th&agrave;nh 3 bản v&agrave;
      c&oacute; gi&aacute; trị như nhau. Mỗi b&ecirc;n giữ 1 bản, 1 bản lưu tại
      cơ quan c&ocirc;ng chứng hoặc chứng thực (nếu c&oacute;) v&agrave; 1 bản
      lưu tại cơ quan thuế (c&aacute;c b&ecirc;n c&oacute; thể thỏa thuận lập
      th&ecirc;m hợp đồng bằng tiếng Anh)./.
    </p>

    <p>
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; ĐẠI DIỆN B&Ecirc;N CHO
      THU&Ecirc;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      ĐẠI DIỆN B&Ecirc;N THU&Ecirc;<br />&nbsp; &nbsp; &nbsp; (K&yacute;
      t&ecirc;n, đ&oacute;ng dấu v&agrave; họ t&ecirc;n, chức vụ của người
      k&yacute;)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp; (K&yacute; t&ecirc;n, họ t&ecirc;n)
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      contract: {
        contractId: "",
        date: "",
        fullName: "",
        citizenId: "",
        dated: "",
        placeOfCitizenId: "",
        placeOfPermanet: "",
        contact: "",
        email: "",
        roomId: "",
        totalArea: "",
        landArea: "",
        publicArea: "",
        privateArea: "",
        device: "",
        ownerOrgirin: "",
        ownerLimit: "",
        rights: "",
        obligations: "",
        commit: "",
        copies: "",
        rentalFee: "",
        securityDeposite: "",
        moveinDate: "",
        signinDate: "",
        expireDate: "",
        gender: "",
        dob: "",
        career: "",
        licensePlate: "",
        vehicleType: "",
        vehicleColor: "",
        relationship: "",
      },
    };
  },
};
</script>
<style>
.contract-form {
  width: 50%;
  margin: auto;
}

.centered-text {
  text-align: center;
}

.header,
.content {
  margin: 20px 0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  text-align: left;
  background-color: #f2f2f2;
}

input[type="text"],
input[type="date"],
input[type="number"],
input[type="email"],
select {
  width: 140px;
  box-sizing: border-box;
}
</style>
