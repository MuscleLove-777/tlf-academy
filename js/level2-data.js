/* ============================================
   TLF Academy - Level 2: 臨床試験の基礎知識
   ============================================ */

const LEVEL2_DATA = {
    id: 2,
    title: "臨床試験の基礎知識",
    icon: "🏥",
    description: "臨床試験のフェーズ、デザイン、SAPなどTLF作成に必要な基礎知識を学ぶ",
    modules: [
        {
            id: 201,
            title: "臨床試験のフェーズ",
            duration: "20分",
            content: `
<h2>臨床試験の開発フェーズ</h2>
<p>医薬品の開発は前臨床試験を経て、<strong>Phase I〜Phase IV</strong>の臨床試験を段階的に実施します。各フェーズで作成されるTLFの特徴と数量は大きく異なります。</p>

<h3>Phase I（第I相試験）</h3>
<p><strong>目的</strong>：安全性・忍容性の確認、薬物動態（PK）の評価</p>
<table>
<thead>
<tr><th>項目</th><th>内容</th></tr>
</thead>
<tbody>
<tr><td>被験者</td><td>健康成人志願者（通常20〜80名）</td></tr>
<tr><td>主な解析</td><td>用量漸増（SAD/MAD）、PK解析</td></tr>
<tr><td>TLFの特徴</td><td>PK TLFが中心、血中濃度推移図が重要</td></tr>
<tr><td>TLF数の目安</td><td>50〜100本</td></tr>
</tbody>
</table>

<h3>Phase II（第II相試験）</h3>
<p><strong>目的</strong>：有効性の探索、用量設定</p>
<table>
<thead>
<tr><th>項目</th><th>内容</th></tr>
</thead>
<tbody>
<tr><td>被験者</td><td>対象疾患の患者（通常100〜300名）</td></tr>
<tr><td>主な解析</td><td>用量反応性、有効性の予備評価</td></tr>
<tr><td>TLFの特徴</td><td>有効性TLFが増加、用量群別の比較表</td></tr>
<tr><td>TLF数の目安</td><td>100〜300本</td></tr>
</tbody>
</table>

<h3>Phase III（第III相試験）</h3>
<p><strong>目的</strong>：有効性と安全性の検証（承認申請のための確認試験）</p>
<table>
<thead>
<tr><th>項目</th><th>内容</th></tr>
</thead>
<tbody>
<tr><td>被験者</td><td>対象疾患の患者（通常1,000〜3,000名以上）</td></tr>
<tr><td>主な解析</td><td>主要エンドポイントの統計的検定、サブグループ解析</td></tr>
<tr><td>TLFの特徴</td><td>最も包括的なTLFセット、ISS/ISE対応</td></tr>
<tr><td>TLF数の目安</td><td>300〜800本以上</td></tr>
</tbody>
</table>

<div class="info-box tip">
<div class="info-box-title">💡 ISS/ISEとは</div>
<strong>ISS（Integrated Summary of Safety）</strong>は複数試験の安全性データを統合した要約、<strong>ISE（Integrated Summary of Effectiveness）</strong>は有効性データの統合要約です。Phase IIIでは、個別試験のTLFに加えてこれらの統合解析TLFも作成します。
</div>

<h3>Phase IV（第IV相試験）</h3>
<p><strong>目的</strong>：市販後の安全性監視、新たな適応症の探索</p>
<table>
<thead>
<tr><th>項目</th><th>内容</th></tr>
</thead>
<tbody>
<tr><td>被験者</td><td>実臨床での患者（数百〜数千名）</td></tr>
<tr><td>主な解析</td><td>長期安全性、リアルワールドデータ解析</td></tr>
<tr><td>TLFの特徴</td><td>安全性重視、PSUR向けTLF</td></tr>
<tr><td>TLF数の目安</td><td>試験により異なる</td></tr>
</tbody>
</table>

<div class="info-box warning">
<div class="info-box-title">⚠️ フェーズ間の違いに注意</div>
TLFプログラマーは、担当するフェーズに応じてTLFの内容や複雑さが大きく異なることを理解しておく必要があります。Phase Iでは主にPKデータの処理が中心ですが、Phase IIIでは複雑な統計解析とサブグループ解析に対応する必要があります。
</div>
`,
            quiz: [
                { id: "q201_1", type: "choice", question: "健康成人志願者を対象とし、安全性と薬物動態を評価するのはどのフェーズですか？", options: ["Phase I", "Phase II", "Phase III", "Phase IV"], answer: 0, explanation: "Phase Iは健康成人志願者を対象とし、安全性・忍容性の確認と薬物動態の評価を目的とします。" },
                { id: "q201_2", type: "choice", question: "承認申請のための確認試験として位置づけられるフェーズはどれですか？", options: ["Phase I", "Phase II", "Phase III", "Phase IV"], answer: 2, explanation: "Phase IIIは有効性と安全性を検証する確認試験であり、承認申請の根拠となります。" },
                { id: "q201_3", type: "choice", question: "複数試験の安全性データを統合した要約を何と呼びますか？", options: ["CSR", "ISS", "ISE", "SAP"], answer: 1, explanation: "ISS（Integrated Summary of Safety）は複数試験の安全性データを統合した要約です。" },
                { id: "q201_4", type: "choice", question: "Phase I試験で中心となるTLFの種類はどれですか？", options: ["有効性TLF", "安全性TLF", "PK TLF", "サブグループ解析TLF"], answer: 2, explanation: "Phase Iでは薬物動態の評価が主目的であるため、PK TLFが中心となります。" },
                { id: "q201_5", type: "fill", question: "Phase I試験で用量を段階的に増加させる試験デザインの略称は？（2つのうちどちらかを英語3文字で回答）", answer: "SAD", explanation: "SAD（Single Ascending Dose）は単回投与漸増試験です。MAD（Multiple Ascending Dose：反復投与漸増試験）もあります。" }
            ]
        },
        {
            id: 202,
            title: "試験デザインの基本",
            duration: "20分",
            content: `
<h2>臨床試験デザインの種類</h2>
<p>試験デザインはTLFの構造に直接影響します。デザインを理解することは、適切なTLFを作成するための前提条件です。</p>

<h3>ランダム化比較試験（RCT）</h3>
<p><strong>RCT（Randomized Controlled Trial）</strong>は臨床試験のゴールドスタンダードです。被験者を<strong>無作為</strong>に投与群に割り付けることで、治療効果を公正に比較します。</p>

<table>
<thead>
<tr><th>要素</th><th>説明</th><th>TLFへの影響</th></tr>
</thead>
<tbody>
<tr><td>ランダム化</td><td>被験者を無作為に群分け</td><td>投与群別の列構成</td></tr>
<tr><td>層別化</td><td>特定因子で層を分けてランダム化</td><td>層別サブグループ解析TLF</td></tr>
<tr><td>対照群</td><td>プラセボまたは実薬対照</td><td>群間比較の統計量表示</td></tr>
</tbody>
</table>

<h3>盲検化（Blinding）</h3>
<p>盲検化は試験のバイアスを最小化するための方法です。</p>
<ul>
<li><strong>非盲検（Open-label）</strong>：医師と被験者の両方が投与内容を知っている</li>
<li><strong>単盲検（Single-blind）</strong>：被験者のみ投与内容を知らない</li>
<li><strong>二重盲検（Double-blind）</strong>：医師と被験者の両方が投与内容を知らない</li>
</ul>

<div class="info-box tip">
<div class="info-box-title">💡 盲検とTLFの関係</div>
二重盲検試験では、DB Lock前のDry Run段階でのTLFに実際の投与群名を使用できません。「Treatment A」「Treatment B」のようなブラインドコードを使用し、<strong>開鍵（Unblinding）</strong>後に正式な投与群名に置き換えます。ADaMのTRTxP（計画投与群）やTRTxA（実際の投与群）が重要になります。
</div>

<h3>主要な試験デザイン</h3>
<table>
<thead>
<tr><th>デザイン</th><th>特徴</th><th>TLFの特徴</th></tr>
</thead>
<tbody>
<tr><td><strong>並行群間比較</strong></td><td>各群が異なる治療を受ける</td><td>群間比較が基本構成</td></tr>
<tr><td><strong>クロスオーバー</strong></td><td>同一被験者が複数治療を順に受ける</td><td>期間別・投与順序別の集計が追加</td></tr>
<tr><td><strong>非劣性試験</strong></td><td>実薬と同等以上の効果を証明</td><td>非劣性マージンの表示、CI図が重要</td></tr>
<tr><td><strong>優越性試験</strong></td><td>対照より優れた効果を証明</td><td>p値と信頼区間が重要</td></tr>
<tr><td><strong>用量反応試験</strong></td><td>複数用量の効果を比較</td><td>用量群ごとの列が増加</td></tr>
<tr><td><strong>単群試験</strong></td><td>対照群なし</td><td>群間比較なし、ヒストリカル対照との比較</td></tr>
</tbody>
</table>

<h3>クロスオーバー試験のTLFの特殊性</h3>
<p>クロスオーバー試験では、以下の追加的なTLFが必要です：</p>
<ol>
<li><strong>期間別要約</strong>：Period 1, Period 2それぞれの結果</li>
<li><strong>Washout期間</strong>の安全性データ</li>
<li><strong>持ち越し効果（Carryover Effect）</strong>の検定結果</li>
<li><strong>投与順序（Sequence）別</strong>の比較</li>
</ol>

<div class="info-box warning">
<div class="info-box-title">⚠️ 非劣性試験の注意点</div>
非劣性試験のTLFでは、非劣性マージン（Δ）を信頼区間の図（Forest Plot等）に明示する必要があります。FAS（ITT）解析とPPS（Per Protocol）解析の両方を示すことが一般的です。
</div>
`,
            quiz: [
                { id: "q202_1", type: "choice", question: "臨床試験のゴールドスタンダードとされるデザインはどれですか？", options: ["単群試験", "クロスオーバー試験", "ランダム化比較試験（RCT）", "観察研究"], answer: 2, explanation: "RCT（ランダム化比較試験）は被験者を無作為に割り付けることでバイアスを最小化し、臨床試験のゴールドスタンダードとされています。" },
                { id: "q202_2", type: "choice", question: "医師と被験者の両方が投与内容を知らない盲検化の方法を何と呼びますか？", options: ["非盲検", "単盲検", "二重盲検", "三重盲検"], answer: 2, explanation: "二重盲検（Double-blind）は医師と被験者の両方が投与内容を知らない方法です。" },
                { id: "q202_3", type: "choice", question: "同一被験者が複数の治療を順に受けるデザインはどれですか？", options: ["並行群間比較", "クロスオーバー", "非劣性試験", "用量反応試験"], answer: 1, explanation: "クロスオーバー試験では同一被験者が複数の治療を期間を分けて順に受けます。" },
                { id: "q202_4", type: "choice", question: "非劣性試験のTLFで特に重要な表示要素はどれですか？", options: ["用量反応曲線", "Kaplan-Meier曲線", "非劣性マージンと信頼区間", "血中濃度推移"], answer: 2, explanation: "非劣性試験では非劣性マージン（Δ）と信頼区間の表示が極めて重要です。" },
                { id: "q202_5", type: "fill", question: "二重盲検試験で開鍵前のTLFに使用されるのは、正式な投与群名の代わりに何ですか？（カタカナ6文字で回答）", answer: "ブラインドコード", explanation: "二重盲検試験では開鍵前はブラインドコード（Treatment A, Treatment B等）を使用し、開鍵後に正式な投与群名に置き換えます。" }
            ]
        },
        {
            id: 203,
            title: "SAP（統計解析計画書）",
            duration: "25分",
            content: `
<h2>SAP（Statistical Analysis Plan）とは</h2>
<p><strong>SAP</strong>はTLFの「設計図」であり、臨床試験における統計解析の方法と、作成するTLFの内容を詳細に記述した文書です。TLFプログラマーにとって最も重要な参照文書の一つです。</p>

<h2>SAPの主要構成要素</h2>
<table>
<thead>
<tr><th>セクション</th><th>内容</th><th>TLFとの関係</th></tr>
</thead>
<tbody>
<tr><td>試験の概要</td><td>試験デザイン、目的</td><td>TLFの全体構成を決定</td></tr>
<tr><td>解析対象集団</td><td>FAS, PPS, SS等の定義</td><td>各TLFの対象集団を決定</td></tr>
<tr><td>主要エンドポイント解析</td><td>主解析の統計手法</td><td>主要Table/Figureの内容</td></tr>
<tr><td>副次エンドポイント解析</td><td>副次解析の統計手法</td><td>副次Table/Figureの内容</td></tr>
<tr><td>安全性解析</td><td>AE, Lab, VS等の解析方法</td><td>安全性TLFの内容と構成</td></tr>
<tr><td>欠測値の取り扱い</td><td>LOCF, MMRM等の方法</td><td>感度分析TLFに反映</td></tr>
<tr><td>TLFリスト</td><td>作成する全TLFの一覧</td><td>TLFの総数と範囲を定義</td></tr>
</tbody>
</table>

<h2>解析対象集団（Analysis Populations）</h2>
<p>SAPでは複数の解析対象集団を定義します。各TLFはいずれかの対象集団に基づいて作成されます。</p>

<table>
<thead>
<tr><th>集団</th><th>正式名称</th><th>定義</th><th>主な用途</th></tr>
</thead>
<tbody>
<tr><td><strong>FAS</strong></td><td>Full Analysis Set</td><td>ランダム化された全被験者（ITTに近い）</td><td>主要有効性解析</td></tr>
<tr><td><strong>PPS</strong></td><td>Per Protocol Set</td><td>プロトコル遵守の被験者のみ</td><td>有効性の感度分析</td></tr>
<tr><td><strong>SS</strong></td><td>Safety Set</td><td>治験薬を1回以上投与された被験者</td><td>安全性解析</td></tr>
<tr><td><strong>PKPS</strong></td><td>PK Population Set</td><td>PK評価可能な被験者</td><td>PK解析</td></tr>
</tbody>
</table>

<div class="info-box tip">
<div class="info-box-title">💡 ADaMでの対象集団フラグ</div>
ADSLデータセットでは、各対象集団に対応するフラグ変数（例：FASFL, PPSFL, SAFFL）が定義されています。TLFプログラミングでは、これらのフラグ変数でサブセットを行います。例：<code>WHERE SAFFL = 'Y'</code>
</div>

<h2>SAPに記載される統計手法の例</h2>
<h3>連続変数の要約</h3>
<ul>
<li>記述統計量：n, Mean, SD, Median, Min, Max, Q1, Q3</li>
<li>ベースラインからの変化量（CFB）：絶対変化量、変化率</li>
</ul>

<h3>カテゴリカル変数の要約</h3>
<ul>
<li>度数と割合：n (%)のフォーマット</li>
<li>信頼区間：Clopper-Pearson法等</li>
</ul>

<h3>主要解析の統計検定</h3>
<ul>
<li><strong>ANCOVA</strong>：共分散分析（連続エンドポイント）</li>
<li><strong>CMH検定</strong>：層別カテゴリカルデータの検定</li>
<li><strong>ログランク検定</strong>：生存時間解析</li>
<li><strong>混合効果モデル（MMRM）</strong>：反復測定データ</li>
</ul>

<h2>SAPとTLFの連携</h2>
<p>SAPのTLFリストセクションには、作成する全TLFが一覧化されています：</p>
<table>
<thead>
<tr><th>TLF番号</th><th>タイトル</th><th>対象集団</th><th>種類</th></tr>
</thead>
<tbody>
<tr><td>Table 14.1.1</td><td>被験者の内訳</td><td>FAS</td><td>Table</td></tr>
<tr><td>Table 14.1.2</td><td>人口統計学的特性</td><td>SS</td><td>Table</td></tr>
<tr><td>Table 14.2.1</td><td>主要エンドポイントの解析結果</td><td>FAS</td><td>Table</td></tr>
<tr><td>Figure 14.2.1</td><td>Kaplan-Meier曲線</td><td>FAS</td><td>Figure</td></tr>
<tr><td>Listing 16.2.1</td><td>有害事象一覧</td><td>SS</td><td>Listing</td></tr>
</tbody>
</table>

<div class="info-box warning">
<div class="info-box-title">⚠️ SAPの変更管理</div>
SAPは「Living Document」として扱われますが、DB Lock前に確定版を完成させる必要があります。変更がある場合はAmendmentとして記録し、変更理由を文書化します。TLFプログラマーは常に最新版のSAPを参照する必要があります。
</div>
`,
            quiz: [
                { id: "q203_1", type: "choice", question: "ランダム化された全被験者を含む解析対象集団はどれですか？", options: ["PPS", "SS", "FAS", "PKPS"], answer: 2, explanation: "FAS（Full Analysis Set）はランダム化された全被験者を含む解析対象集団です。ITT（Intent-to-Treat）に近い定義です。" },
                { id: "q203_2", type: "choice", question: "安全性解析に使用される対象集団はどれですか？", options: ["FAS", "PPS", "SS", "PKPS"], answer: 2, explanation: "SS（Safety Set）は治験薬を1回以上投与された被験者を含み、安全性解析に使用されます。" },
                { id: "q203_3", type: "choice", question: "共分散分析の略称はどれですか？", options: ["ANOVA", "ANCOVA", "MMRM", "CMH"], answer: 1, explanation: "ANCOVA（Analysis of Covariance）は共分散分析の略称で、連続エンドポイントの主要解析に頻用されます。" },
                { id: "q203_4", type: "choice", question: "SAPの変更を記録する文書を何と呼びますか？", options: ["Addendum", "Amendment", "Supplement", "Revision"], answer: 1, explanation: "SAPの変更はAmendmentとして記録し、変更理由を文書化します。" },
                { id: "q203_5", type: "fill", question: "ADSLで安全性解析対象集団を示すフラグ変数名は？（英語5文字で回答）", answer: "SAFFL", explanation: "SAFFLはSafety Population Flagの変数名で、SS（Safety Set）に該当する被験者を'Y'で示します。" }
            ]
        },
        {
            id: 204,
            title: "規制当局と提出要件",
            duration: "20分",
            content: `
<h2>主要な規制当局</h2>
<p>臨床試験データとTLFの提出先となる主要な規制当局を理解することは、TLFプログラマーにとって重要です。</p>

<table>
<thead>
<tr><th>規制当局</th><th>国/地域</th><th>主な提出形式</th></tr>
</thead>
<tbody>
<tr><td><strong>FDA</strong></td><td>米国</td><td>eCTD + CDISC標準データ</td></tr>
<tr><td><strong>EMA</strong></td><td>欧州</td><td>eCTD + CDISC標準データ</td></tr>
<tr><td><strong>PMDA</strong></td><td>日本</td><td>eCTD + CDISC標準データ</td></tr>
<tr><td><strong>NMPA</strong></td><td>中国</td><td>eCTD（移行中）</td></tr>
<tr><td><strong>Health Canada</strong></td><td>カナダ</td><td>eCTD</td></tr>
</tbody>
</table>

<h3>FDA（Food and Drug Administration）</h3>
<p>FDAは世界で最も影響力のある規制当局であり、CDISC標準の採用を最も早く義務化しました。</p>
<ul>
<li><strong>2016年12月</strong>以降：NDA/BLAでCDISC標準データの提出を義務化</li>
<li><strong>SDTM + ADaM + Define-XML</strong>の提出が必須</li>
<li><strong>TLFはCSR内に含まれる形で提出</strong>（eCTD Module 5）</li>
<li>FDA Reviewerはデータセットを直接レビュー可能</li>
</ul>

<h3>ICH E3ガイドライン</h3>
<p><strong>ICH E3</strong>はCSR（治験総括報告書）の構成と内容を規定する国際ガイドラインです。TLFの配置はこのガイドラインに従います。</p>

<table>
<thead>
<tr><th>ICH E3セクション</th><th>内容</th><th>関連TLF</th></tr>
</thead>
<tbody>
<tr><td>Section 10</td><td>被験者の評価</td><td>被験者の内訳Table、人口統計Table</td></tr>
<tr><td>Section 11</td><td>有効性の評価</td><td>有効性Tables, Figures</td></tr>
<tr><td>Section 12</td><td>安全性の評価</td><td>安全性Tables, Listings</td></tr>
<tr><td>Section 14</td><td>参考表</td><td>要約Tables（本文中の表の詳細版）</td></tr>
<tr><td>Section 16</td><td>付録</td><td>個別データListings</td></tr>
</tbody>
</table>

<h2>eCTD（electronic Common Technical Document）</h2>
<p><strong>eCTD</strong>は規制当局への電子的な承認申請のための標準フォーマットです。</p>

<table>
<thead>
<tr><th>Module</th><th>内容</th><th>TLFの位置</th></tr>
</thead>
<tbody>
<tr><td>Module 1</td><td>地域固有の情報</td><td>-</td></tr>
<tr><td>Module 2</td><td>概要（CTDサマリー）</td><td>要約Tables/Figures</td></tr>
<tr><td>Module 3</td><td>品質</td><td>-</td></tr>
<tr><td>Module 4</td><td>非臨床</td><td>-</td></tr>
<tr><td>Module 5</td><td>臨床</td><td><strong>CSR内のTLF</strong>（主要な配置先）</td></tr>
</tbody>
</table>

<div class="info-box tip">
<div class="info-box-title">💡 eCTD Module 5の構成</div>
Module 5にはCSR（5.3.5）のほか、臨床概要（2.7）、臨床概括評価（2.5）が含まれます。ISS/ISEのTLFはModule 5の統合解析セクション（5.3.5.3）に配置されます。
</div>

<h2>PMDA（日本）の特有要件</h2>
<p>日本のPMDAには以下の特有の要件があります：</p>
<ul>
<li><strong>日本人サブグループ解析</strong>：グローバル試験では日本人被験者のサブグループTLFが必要</li>
<li><strong>J-CTD</strong>：eCTDの日本版フォーマット</li>
<li><strong>2020年4月</strong>以降：CDISC標準データの提出を原則要求</li>
<li>TLFの<strong>日本語翻訳</strong>が必要な場合がある</li>
</ul>

<div class="info-box warning">
<div class="info-box-title">⚠️ 地域ごとの要件の違い</div>
グローバル試験では、各地域の規制要件に対応するため、追加のTLFが必要になることがあります。例えば、EMAは特定の安全性データの表示形式を求めることがあり、PMDAは日本人データの別途集計を要求します。TLFプログラマーは提出先の規制要件を事前に確認する必要があります。
</div>
`,
            quiz: [
                { id: "q204_1", type: "choice", question: "CDISC標準データの提出を最も早く義務化した規制当局はどれですか？", options: ["EMA", "PMDA", "FDA", "NMPA"], answer: 2, explanation: "FDAは2016年12月以降、NDA/BLAでCDISC標準データの提出を義務化した最初の主要規制当局です。" },
                { id: "q204_2", type: "choice", question: "CSRの構成と内容を規定する国際ガイドラインはどれですか？", options: ["ICH E6", "ICH E3", "ICH E9", "ICH E8"], answer: 1, explanation: "ICH E3はCSR（治験総括報告書）の構成と内容を規定する国際ガイドラインです。" },
                { id: "q204_3", type: "choice", question: "eCTDでCSR内のTLFが配置される主要なModuleはどれですか？", options: ["Module 2", "Module 3", "Module 4", "Module 5"], answer: 3, explanation: "eCTDのModule 5（臨床）にCSRが含まれ、TLFはその中に配置されます。" },
                { id: "q204_4", type: "choice", question: "PMDAの特有要件として、グローバル試験で求められるのはどれですか？", options: ["英語翻訳", "日本人サブグループ解析", "追加のPK解析", "非臨床データの提出"], answer: 1, explanation: "PMDAはグローバル試験において日本人被験者のサブグループ解析TLFを要求します。" },
                { id: "q204_5", type: "fill", question: "規制当局への電子的な承認申請の標準フォーマットの略称は？（英語4文字で回答）", answer: "eCTD", explanation: "eCTD（electronic Common Technical Document）は規制当局への電子的な承認申請の標準フォーマットです。" }
            ]
        }
    ]
};
