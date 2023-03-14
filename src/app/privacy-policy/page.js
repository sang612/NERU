'use client';

import { LeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { css, cx } from '@emotion/css';
import { useRouter } from 'next/navigation';

export default function PrivacyPolicyPage() {
  const router = useRouter();

  return (
    <div className={` mx-auto h-full xsm:w-[540px] min-h-screen bg-[#ffffff] relative`}>
      <div className="text-center flex flex-col justify-center px-[26px] pt-[43.98px] pb-[60.07px] w-full h-full">
        <div className="flex justify-between items-center">
          <div onClick={() => router.back()}>
            <LeftOutlined
              className={cx(
                'w-6 h-6 mx-2 text-primary',
                css`
                  svg {
                    width: 100%;
                    height: 100%;
                  }
                `
              )}
            />
          </div>
          <h1 className="w-full text-center text-3xl md:text-4xl xl:text-5xl text-primary">寝るソクプライバシーポリシー</h1>
          <div className="w-6 h-6 mx-2"></div>
        </div>
        <div className="w-full py-4 md:py-6 lg:py-8 xl:py-10 text-left">
          制定：2023年3月1日
          <br />
          <div className="my-3">
            <p>
              株式会社オクチィ（本社：東京都渋谷区松濤1丁目17番6号、代表取締役社長：畑あゆ美、以下「当社」といいます。）は、当社が提供するアプリケーションソフト「寝るソク」（以下「本アプリ」といいます。）を通じて、また、本アプリに付帯して当社が提供するサービス（以下「本サービス」といいます。）に関連して取得する、個人情報を含む利用者情報（以下「利用者情報」といいます。）の取扱いについて、以下のとおり寝るソクプライバシーポリシー（以下「本プライバシーポリシー」といいます。）を定めます。なお、本プライバシーポリシーにおいて「個人情報」とは、個人情報の保護に関する法律（平成15年法律第57号）（以下「個人情報保護法」といいます。）第2条第1項に定める個人情報をいいます。
            </p>
          </div>
          <div className="my-3">
            <p>
              本アプリの利用登録を申し込まれた方及び本アプリを利用する方（以下「利用者」といいます。）は、本アプリの利用にあたっては、本プライバシーポリシーをお読みいただいた上で、本プライバシーポリシーの内容に同意いただく必要があります。利用者が本アプリのインストールボタンを押した時点で、本プライバシーポリシーに同意したものとします。なお、利用者が親権者（保護者）の同意を必要とする未成年（本プライバシーポリシーの同意時点で15歳未満である場合を含みますが、これに限りません。）である場合、本アプリを利用し、利用者情報を入力する場合には、親権者（保護者）の同意の下、行うものとします。
            </p>
          </div>
          <div className="my-3">
            <h4 className="font-bold">1. 取得する利用者情報・取得方法</h4>
            <p className="my-3">
              当社は、利用者による本アプリの利用に関連して、以下の利用者情報を取得する可能性があります。ただし、本アプリのバージョン又は設定によっては、以下の利用者情報の全部又は一部を取得しない場合もあります。
            </p>
            <table className="border-collapse text-center my-3">
              <thead>
                <tr className="border">
                  <th className="border w-[65%]">利用者情報の項目</th>
                  <th className="border">取得方法</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border">
                  <td className="border w-[65%]">アカウント登録情報としてのユーザー名、電話番号及びメールアドレス</td>
                  <td className="border">端末操作を通じた利用者による入力等</td>
                </tr>
                <tr className="border">
                  <td className="border w-[65%]">利用者の年齢、性別、身体的特徴その他の利用者に関する情報</td>
                  <td className="border">端末操作を通じた利用者による入力等</td>
                </tr>
                <tr className="border">
                  <td className="border w-[65%]">
                    利用者が本アプリ上に記録した利用者の顔及び口腔内の画像並びに就寝中の呼吸音（いびきを含む）
                  </td>
                  <td className="border">端末操作を通じた利用者による撮影等</td>
                </tr>
                <tr className="border">
                  <td className="border w-[65%]">利用者の端末の振動に関する情報</td>
                  <td className="border">本アプリの利用に伴う自動取得</td>
                </tr>
                <tr className="border">
                  <td className="border w-[65%]">
                    本アプリの利用状況等に関する情報、cookie情報、端末識別子及びIPアドレス等の利用者の端末情報及び通信情報、利用者の端末に関連づけられた情報、並びに位置情報等
                  </td>
                  <td className="border">本アプリの利用に伴う自動取得</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="my-3">
            <h4 className="font-bold">2. 利用者情報の利用目的</h4>
            <div>
              (1) 当社は、取得した利用者情報を、以下の利用目的で使用いたします。
              <div className="ml-5">
                <ol className="list-decimal ml-5">
                  <li>
                    <span className="pl-4"></span>利用者による本アプリの利用を可能にするため
                  </li>
                  <li>
                    <span className="pl-4"></span>呼吸音等の分析及び解析を含む、本サービスの提供のため
                  </li>
                  <li>
                    <span className="pl-4"></span>本アプリ及び本サービスに関するご案内、お問い合せ等への対応のため
                  </li>
                  <li>
                    <span className="pl-4"></span>
                    本アプリ及び本サービスに関する当社の規約、ポリシー、特約等に違反する行為に対する対応のため
                  </li>
                  <li>
                    <span className="pl-4"></span>
                    本アプリ及び本サービスの改善及び向上、並びに当社における新サービスの開発等（機械学習その他のAI開発を含みます。）に役立てるため
                  </li>
                  <li>
                    <span className="pl-4"></span>
                    本アプリ及び本サービスに関連して、個人を識別できない形式に加工した統計データを作成するため
                  </li>
                  <li>
                    <span className="pl-4"></span>本プライバシーポリシーに定めるところに従い第三者に提供するため
                  </li>
                  <li>
                    <span className="pl-4"></span>その他、上記利用目的に付随する目的のため
                  </li>
                </ol>
              </div>
            </div>
            <div>
              (2)
              当社は、本サービスの提供のために、本アプリ以外で当社が適正に取得した利用者の個人情報を利用することがあります。また、当社は本アプリにおいて取得する利用者情報とこれらの個人情報とを組み合わせた上で、上記の利用目的の範囲で利用することがあります。
            </div>
          </div>
          <div className="my-3">
            <h4 className="font-bold">3. 利用者情報の第三者への提供</h4>
            <p className="my-3">
              当社は、第2項所定の目的を達成するために必要な範囲で、取得した利用者情報を、健康管理、医療、美容等の分野の発展に資する研究開発（関連データの分析・解析を含みます。）及びその成果の実用化を行う研究者、大学、研究機関、及び当該分野に従事する企業・機関に提供することがあります。
            </p>
            <p className="my-3">
              当社は、本プライバシーポリシーに規定する場合、利用者の同意を得た場合又は個人情報保護法その他適用法令・ガイドラインに基づく場合を除いては、利用者情報を第三者に開示又は提供することはいたしません。
            </p>
          </div>
          <div className="my-3">
            <h4 className="font-bold">4. 利用者情報の取扱いの委託</h4>
            <p className="my-3">
              当社は、第2項記載の利用目的の達成に必要な範囲内において、個人情報を含む利用者情報の取扱いの全部又は一部を、第三者に委託する場合があります。この場合、当社は当該委託先に対して、個人情報の保護措置を講じた上で当該利用者情報を預託します。
            </p>
          </div>
          <div className="my-3">
            <h4 className="font-bold">5. 情報収集モジュールについて</h4>
            <p className="my-3">
              本アプリは、以下の情報収集モジュールにて利用者情報を取得、送信及び蓄積し、利用目的の達成に必要な範囲で以下に記載の第三者へ提供することがあります。情報収集モジュールとは、第三者が提供するプログラムであって、利用者情報を取得・解析するための機能をもつものをいいます。なお、当社は情報収集モジュールで取得した利用者情報を、利用者個人を識別する情報と組み合わせて利用することがあります。
            </p>
            <div className="my-3">
              (1) 情報収集モジュール名： Google Analytics <br />
              本アプリには、Google LLCが提供する情報収集モジュールであるGoogle
              Analyticsが組み込まれています。当社は、Google
              Analyticsを通じて、cookie情報を用いて利用者情報（利用者ID、端末情報、及び本アプリの利用履歴）を取得、送信及び蓄積し、本アプリの利用状況を把握するために利用します。
              <br />
              Google Analyticsの利用規約、Google
              Analyticsの詳細及びオプトアウト手続については、以下のURLよりご確認ください。 <br />
              Google Analytics 利用規約：
              <Link
                href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                className="text-primary underline break-words"
              >
                https://marketingplatform.google.com/about/analytics/terms/jp/
              </Link>
              <br />
              Googleのプライバシーと利用規約：
              <Link href="https://policies.google.com/technologies/partner-sites" className="text-primary underline break-words">
                https://policies.google.com/technologies/partner-sites
              </Link>
              <br />
              データの保護：
              <Link
                href="https://support.google.com/analytics/answer/6004245#zippy="
                className="text-primary underline break-words"
              >
                https://support.google.com/analytics/answer/6004245#zippy=
              </Link>
            </div>
          </div>
          <div className="my-3">
            <h4 className="font-bold">6. 同意取得の方法、通知・公表</h4>
            <p className="my-3">
              (1)
              本アプリは、本プライバシーポリシーの内容を確認し、内容を理解し同意のうえ、ご利用ください。本アプリのインストールボタンを押した時点で本プライバシーポリシーに同意したものとします。また、利用者が親権者（保護者）の同意を必要とする未成年者である場合、親権者（保護者）からの同意を得た上で本アプリを利用するものとします。{' '}
              <br />
              (2)
              本プライバシーポリシーは、本アプリ内のほか、アプリケーションマーケットやダウンロードページの本アプリを紹介するスペースに掲示・公表しています。
            </p>
          </div>
          <div className="my-3">
            <h4 className="font-bold">7. 利用者情報の取得停止等</h4>
            <p className="my-3">
              利用者情報の当社による取得の停止（取得の同意の無効化）の方法は、本アプリをアンインストールする方法に限られます。なお、アンインストール時点で既に取得済みの利用者情報については、当社において引き続き利用することがあります。
            </p>
          </div>
          <div className="my-3">
            <h4 className="font-bold">8. 開示等の請求</h4>
            <p className="my-3">
              当社は、利用者ご本人から個人情報保護法の規定に基づく個人情報の開示、訂正、削除、利用停止等の請求があった場合、本人確認の上、法令に基づき可能な範囲で遅滞なく対応を行います。
            </p>
          </div>
          <div className="my-3">
            <h4 className="font-bold">9. 安全管理措置</h4>
            <p className="my-3">
              当社は、個人情報の漏えい、滅失又は毀損の防止その他の個人情報の安全管理のために、必要かつ適切な措置を講じています。当社が講じる安全管理措置の内容については、本プライバシーポリシーに記載の当社の問い合わせ窓口にお問い合わせください。
            </p>
          </div>
          <div className="my-3">
            <h4 className="font-bold">10. お問い合わせ</h4>
            <p className="my-3">
              本アプリ及び本サービスにおける個人情報の取扱いに関するご意見・ご要望その他のお問い合わせは、下記窓口までお願いいたします。{' '}
              <br />
              info@okuchy.co.jp
            </p>
          </div>
          <div className="my-3">
            <h4 className="font-bold">11. 本プライバシーポリシーの変更</h4>
            <p className="my-3">
              当社は、個人情報の取扱いに関する運用状況を適宜見直し、継続的な改善に努めるものとし、必要に応じて、本プライバシーポリシーを変更することがあります。変更した場合には、本アプリ上に表示する方法で利用者に通知いたします。ただし、法令上利用者の同意が必要となるような内容の変更の場合は、当社所定の方法で利用者の同意を得るものとします。
            </p>
          </div>
          <div className="my-3 text-right">
            <span>以上</span>
          </div>
        </div>
      </div>
    </div>
  );
}
