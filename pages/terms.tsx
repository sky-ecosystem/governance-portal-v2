/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Flex, Text, Card, Heading } from 'theme-ui';
import { markdownToHtml } from 'lib/markdown';
import { GetStaticProps } from 'next';
import { HeadComponent } from 'modules/app/components/layout/Head';

const terms = `
**Preamble**

These terms of use (**“Terms”**) are entered into between Jetstream Association, a non-profit entity established under the laws of Switzerland and domiciled in Zug, Switzerland (**“Association”**) and the users of the Maker Governance Voting Portal (**“User”**, **“you”**).
The following Terms together with any documents incorporated by reference herein, govern your access to and use of the Maker Governance Voting Portal (**“Voting Portal”**). 

Please read these Terms carefully before using the Voting Portal. By using or otherwise accessing the Voting Portal or clicking to accept or agree to these Terms where that option is made available, you 

(1) agree that you have read and understand these Terms;
(2) accept and agree to these Terms; and 
(3) any additional terms, rules and conditions of participation issued from time-to-time. 

If you do not agree to these Terms, then you must refrain from accessing or using the Voting Portal.

These Terms may be modified or replaced at the Association’s discretion at any time. All modifications take effect immediately upon posting. The most current version will be posted with the “Last Revised” date updated accordingly. You waive any right to receive specific notice of changes made. Your continued use of the Voting Portal after any such changes constitutes your acceptance of the modified Terms.

**1. The Voting Portal**

The Voting Portal is an independent user interface available at https://vote.makerdao.com allowing Users to interact with the governance mechanisms of the Maker Protocol, an autonomous system of smart contracts on the Ethereum Blockchain (**“Open-Source Protocol”**), and relying on the MKR Token (**“Token”**), a cryptographic token required for participation in the governance of the Open-Source Protocol (**“Governance”**). 

The Voting Portal serves as a graphical user interface that provides an easy way to access and interact with the Open-Source Protocol. 
As the Governance is permissionless and autonomous, you can participate at any time via other user interfaces or by using smart contract frameworks such as Hardhat, Brownie or Truffle. This means that the accessibility does not depend on the Association and/or the availability of the Voting Portal. 

**1.1 Interaction with the Open-Source Protocol**

The Association exclusively offers the Voting Portal and has no control over the Open-Source Protocol, including its Governance and the effective participation mechanism of such Governance. 

Third-Party Infrastructure Disclaimer: By using the Voting Portal, you expressly acknowledge and agree that the Voting Portal interacts with third-party infrastructures such as the Open-Source Protocol and Ethereum network, each of which involves its own risks. It is your sole responsibility to conduct appropriate due diligence before engaging with such infrastructures through the Voting Portal.

**1.1.1 Wallet Connection**

Interactions with the Open-Source Protocol through the Voting Portal require you to connect your wallet. 

The Voting Portal relies on wagmi, a third party open-source middleware between the Voting Portal and your wallet to facilitate governance actions such as casting votes or delegating voting power. All such actions must be explicitly approved and signed by you through your wallet. 

The Association cannot access your wallet or submit votes or delegations on your behalf.

Security Disclaimer: If the Voting Portal were ever compromised, malicious actors could present misleading vote or delegation transactions, disguising harmful or unintended actions as legitimate signals. Even though your wallet will still request your signature, a deceptive interface interference can integrate UX dark patterns to obscure the true function of a transaction submitted for your signing — for example, delegating your votes to an attacker or executing a function other than what’s described in the UI.

You must therefore always verify the following in your wallet prompt:

- The contract address receiving the transaction;
- The function being called (e.g., castVote, delegate, sign);
- Any attached data or parameters.

By using this Voting Portal, you acknowledge and accept full responsibility for verifying the accuracy and intent of any transaction you authorize. If anything seems unclear or unexpected, reject the transaction immediately and contact hello@jetstream.gg.

**1.1.2 Governance Information Display**

The Voting Portal communicates with the Open-Source Protocol via third-party providers such as Alchemy, Tenderly, etc., offering third-party infrastructure providing remote procedure calls (RPC) to fetch Governance data, simulate and broadcast signed governance actions to the blockchain. These calls are made through standardized JSON-RPC protocols. Any signed transaction sent through the Voting Portal is ultimately transmitted over APIs of aforementioned third-party providers. 

Security Disclaimer: In the event of an RPC compromise, signed transactions may still be broadcasted with unintended effects (malicious rerouting, corrupted transaction details, etc.).

You are solely responsible for independently verifying any on-chain information relevant to your use of the Voting Portal. This includes, but is not limited to, transaction status, contract interactions, and token balances, by using third-party block explorers (such as Etherscan) to confirm the accuracy and finality of such information.

The Association does not assume any responsibility for the accuracy, completeness or actuality of the information displayed on the Voting Portal, as further stated in Section 4, and therefore, the Association shall not be liable for any claims or damages related to errors, inaccuracies, or delays in the display of the information or any decisions, transaction, acts or omissions that you make in reliance thereon.

**1.1.3 Gas Fees**

All interactions with the Ethereum blockchain and applications deployed thereon, such as the Open-Source Protocol, regardless of whether they are initiated through the Voting Portal, require the payment of a transaction fee (**“Gas Fee”**). The Gas Fee required to execute a transaction depends on the activity on the Ethereum blockchain and is entirely outside of the control of the Association. By participating in the Governance, you acknowledge and agree that Gas Fees are non-refundable under any circumstances.

**1.2 Interactions with the Token**

Governance of the Open-Source Protocol requires holding Tokens. The Voting Portal does not interact with your Tokens, which are used exclusively within the Open-Source Protocol itself. 

As the Voting Portal merely provides access to Governance as defined by the Open-Source Protocol, without altering or influencing its underlying rules, the Association does not guarantee access to Governance through the Voting Portal for individuals who are not eligible under the Governance own criteria, such as users who do not hold Tokens.

The Association does not issue nor offer Tokens to users of the Voting Portal. 

**1.3 Integration of the Poll Tool**

The Voting Portal includes an open-source governance polling tool deployed by the Association on the Arbitrum network (“Poll Tool”) to facilitate lightweight, low-cost community signaling (e.g., opinion polls, informal sentiment checks). This tool allows you to submit responses without paying transaction fees, provided the required gas costs are subsidized.

The Poll Tool is an open-source tool that operates autonomously and is not actively controlled or governed by the Association once deployed.

The Association makes no assurances of uninterrupted functionality of the Poll Tool or continued support from the Voting Portal.

Subsidization Notice: While the Association may choose to subsidize gas costs, it does not guarantee that such subsidies will continue. Participants may not rely on the tool being permanently available as gasless.

**2. Eligibility**

You hereby represent and warrant that you are fully able and competent to enter into the terms, conditions, obligations, affirmations, representations and warranties set forth in these Terms and to abide by and comply with these Terms. 

You are representing and warranting that you are of the legal age of majority in your jurisdiction as is required to access and use the Open-Source Protocol through the Voting Portal.
 
You further represent that you are otherwise legally permitted to use the Voting Portal in your jurisdiction including owning cryptographic tokens and using such. You further represent you comply with the laws of your jurisdiction and acknowledge that the Association is not liable for your compliance with such laws. Finally, you represent and warrant that you will not use the Voting Portal for any illegal activity nor to circumvent the Governance rules.

**3. Third Party Links**

The Voting Portal may contain links to websites and content that is controlled or operated by third parties (**"Third-Party Links”**). The Association provides these Third-Party Links for convenience only, and the inclusion of any Third-Party Links in the Voting Portal does not imply any endorsement by the Association of the Third Party Links and/or their operators. The Association is neither responsible nor liable for any content associated with the Third-Party Links.
If you believe that any Third-Party Links contain or promote illegal, harmful, fraudulent, infringing, obscene, defamatory, threatening, intimidating, harassing, hateful, racially, ethnically or otherwise objectionable content, please contact us via hello@jetstream.gg so that we can remove any such Third-Party Links from the Airdrop Program and/or the User Interface.

** 4. No Warranties and Limitation of Liability**

The Voting Portal is provided on an “as is” and “as available” basis, and you understand and agree that the Association expressly disclaims all warranties or conditions of any kind, whether express, implied, statutory or otherwise. **The access to and use of the Voting Portal is made at your own risk.**

Notably, the Association does not guarantee that the Voting Portal is free from defects, errors, bugs, and security vulnerabilities, that it will be available at any time, or that displayed information is correct, as stated under Section 1.1.2. The Association gives no assurance that any functionalities of the Voting Portal will satisfy your requirements, provide the intended results, meet any performance or reliability standards.

The Association waives all liability for losses or damages resulting from third-party infrastructure failures, such as malicious or misrouted RPC activity, or transaction submission bugs or misinterpretations, Open-Source Protocol or Ethereum network failures. **You are solely responsible for any transaction you approve and sign.**

By utilizing the Voting Portal, you represent that you understand the inherent risks associated with cryptographic systems; and warrant that you understand the usage, intricacies, and difficulties of using smart contracts and native cryptographic tokens, as well as the risk relating to interaction therewith through interfaces such as the Voting Portal, as depicted in these Terms.  

YOU ACKNOWLEDGE AND AGREE THAT YOU ASSUME FULL RESPONSIBILITY FOR YOUR USE OF THE VOTING PORTAL. YOU ACKNOWLEDGE AND AGREE THAT ANY INFORMATION YOU SEND OR RECEIVE DURING YOUR USE OF THE VOTING PORTAL MAY NOT BE SECURE AND MAY BE INTERCEPTED OR LATER ACQUIRED BY UNAUTHORIZED PARTIES. YOU ACKNOWLEDGE AND AGREE THAT YOUR USE OF THE VOTING PORTAL IS AT YOUR OWN RISK. RECOGNIZING SUCH, YOU UNDERSTAND AND AGREE THAT, TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, THE ASSOCIATION WILL NOT BE LIABLE TO YOU FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, EXEMPLARY OR OTHER DAMAGES OF ANY KIND, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA OR OTHER TANGIBLE OR INTANGIBLE LOSSES OR ANY OTHER DAMAGES BASED ON CONTRACT, TORT, STRICT LIABILITY OR ANY OTHER THEORY (EVEN IF THE ASSOCIATION HAD BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES), RESULTING FROM YOUR USE OF THE VOTING PORTAL. 

SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES OR LIMITATION OR EXCLUSION OF LIABILITY. ACCORDINGLY, SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.

**5. Prohibited Use**

You may not use the Voting Portal to engage in the following categories of activity (**"Prohibited Uses"**). The specific types of use listed below are representative, but not exhaustive. 

By using the Voting Protocol provided here, you confirm that you will not use it to proceed with any of the following: 
- Unlawful Activity: Activity which would violate, or assist in violation of, any law, statute, ordinance, or regulation, sanctions programs administered in any relevant country, or which would involve proceeds of any unlawful activity; publish, distribute or disseminate any unlawful material or information 
- Abuse Other Users: Interfere with another individual's or entity's access to or use of the Voting Portal or the Open-Source Protocol; defame, abuse, extort, harass, stalk, threaten or otherwise violate or infringe the legal rights (such as, but not limited to, rights of privacy, publicity and intellectual property) of others; incite, threaten, facilitate, promote, or encourage hate, racial intolerance, or violent acts against others; harvest or otherwise collect information from the Voting Portal about others, including without limitation email addresses, without proper consent
- Fraud: Activity which operates to defraud any other person; provide any false, inaccurate, or misleading information. 
- Intellectual Property Infringement: Engage in transactions involving items that infringe or violate any copyright, trademark, right of publicity or privacy or any other proprietary right under the law, including but not limited to sales, distribution, or access to counterfeit music, movies, software, or other licensed materials without the appropriate authorization from the rights holder; use of the Association’s intellectual property, name, or logo, including use of its trade or service marks, without express consent from the Association or in a manner that otherwise harms the Association; any action that implies an untrue endorsement by or affiliation with the Association.

**6. Indemnity**

You agree to release and to indemnify, defend and hold harmless the Association and any related entities, as well as the officers, directors, employees, shareholders and representatives of any of the foregoing entities, from and against any and all losses, liabilities, expenses, damages, costs (including attorneys’ fees, fees or penalties imposed by any regulatory authority and court costs) claims or actions of any kind whatsoever arising or resulting from your use of the Voting Portal, your violation of these Terms, your violation of any law, rule, or regulation, or the rights of any third party, and any of your acts or omissions that implicate publicity rights, defamation or invasion of privacy. 

The Association reserves the right, at its own expense, to assume exclusive defense and control of any matter otherwise subject to indemnification by you and, in such case, you agree to cooperate with the Association in the defense of such matter.

**7. Proprietary Rights**

You acknowledge and agree that all title, ownership and intellectual property rights in and to the Voting Portal are owned by the Association, and/or third parties, their related entities or their licensors., and that the Voting Portal is made available to you under the AGPL-3.0 open-source license (**“License”**). Other than expressly stated herein, no rights are granted to you regarding the Voting Portal. 

Except as expressly authorized by the License or a relevant entity, you agree not to copy, modify, rent, lease, loan, sell, distribute, perform, display or create derivative works based on the Voting Portal, in whole or in part.

**8. Termination and Suspension**

The Association may terminate or suspend all or part of your access to the Voting Portal, without prior notice or liability, if you breach any of the terms or conditions of the Terms. 

**9. Discontinuation**

The Association reserves the right to remove features from the Voting Portal or to discontinue the operation of the Voting Portal in its entirety at any time without prior notice or liability, at its own discretion. 

**10. Governing Law and Jurisdiction**
These Terms shall be construed and interpreted in accordance with the substantive laws of Switzerland, excluding the Swiss conflict of law rules. The United Nations Convention for the International Sales of Goods is excluded. Any dispute arising out of or in conjunction with these Terms shall be submitted to the exclusive jurisdiction of the ordinary courts of the city of Zug, Switzerland.
To the fullest extent permitted by any applicable law, the User waives any right to participate in a class action lawsuit or a class-wide arbitration against the Association or any individual or entity involved in the operation of the Voting Portal.

**11. Contact**

Any questions related to these Terms can be sent to hello@jetstream.gg

**12. Miscellaneous**

**12.1 Entire Agreement and Severability**

These Terms contain the entire agreement between the Association and you regarding the subject matter hereof and supersedes all understandings and agreements whether written or oral. If any provision of these Terms is invalid, illegal, or unenforceable in any jurisdiction, such invalidity, illegality, or unenforceability shall not affect any other provision of these Terms or invalidate or render unenforceable such provision in any other jurisdiction. Upon such determination that any provision is invalid, illegal, or unenforceable, these Terms shall be modified to effectuate the original intent of the Parties as closely as possible. 

**12.2 Waiver and Severability of Terms**

The failure of the Association to exercise or enforce any right or provision of the Terms shall not constitute a waiver of such right or provision. If any provision of these Terms is invalid, illegal, or unenforceable in any jurisdiction, such invalidity, illegality, or unenforceability shall not affect any other provision of these Terms or invalidate or render unenforceable such provision in any other jurisdiction. Upon such determination that any provision is invalid, illegal, or unenforceable, these Terms shall be modified to effectuate the original intent of the Parties as closely as possible. 

**12.3 Assignment**

You shall have no right to assign or transfer its rights and obligations under these Terms, either as a whole or in part, to any third party without the prior written and express consent of the Association. You agree that any assignment or transfer in violation of these Terms shall be null and void.

**12.4 Statute of Limitations**

You agree that regardless of any statute or law to the contrary, any claim or cause of action arising out of or related to the use of the Voting Portal must be filed within one (1) year after such claim or cause of action arose or be forever barred.

**12.5 Section Titles**

The section titles in the Terms are for convenience only and have no legal or contractual effect.

**12.6 Privacy Policy**

All information collected on the Site is subject to the Privacy Policy. By using the Service, you consent to all actions taken with respect to your information in compliance with the Privacy Policy.

`;

export default function Terms(props: { content: string }): JSX.Element {
  return (
    <Flex sx={{ flexDirection: 'column', justifyContent: 'center' }}>
      <HeadComponent title="Terms" />

      <Heading as="h2" sx={{ textAlign: 'center' }}>
        Terms of Use
      </Heading>
      <Text sx={{ textAlign: 'center', fontStyle: 'italic', mt: 1, mb: 3 }}>
        Last Revised: May 19th, 2025
      </Text>
      <Card sx={{ overflowY: 'auto' }}>
        <div dangerouslySetInnerHTML={{ __html: props.content || '' }} />
      </Card>
    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const content = await markdownToHtml(terms);

  return {
    props: {
      content
    }
  };
};
