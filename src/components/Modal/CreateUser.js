import { Button } from '../Button/button';
import CardLayout from '../CardLayout';
import { Input } from '../Input';

export const ModalCreateUser = ({
  validate,
  lastName,
  setLastName,
  lastNameKatakana,
  setLastNameKatakana,
  firstName,
  setFirstName,
  firstNameKatakana,
  setFirstNameKatakana,
  email,
  setEmail,
  setPhone,
  phone,
  handleSubmit,
  isLoading,
  setModalCreate,
  checkValidateTel,
  checkValidateEmail,
  checkValidateName,
  checkValidateNameKatakana,
}) => (
  <CardLayout>
    <div className="mt-2 w-[60%] mx-auto">
      <h1 className="w-full text-center text-xl xsm:text-3xl text-skyBlue-300 mt-2 mb-4">ユーザー登録</h1>
      <div className="w-full px-4 md:p-6 lg:p-8 xl:p-10">
        <div className="flex justify-start items-start w-full my-2">
          <div className="mb-4 h-14 flex items-center w-36">姓</div>
          <div className="flex-1 h-20">
            <div className="w-full h-full flex items-start">
              <Input
                name="lastName"
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                validate={lastName ? () => checkValidateName(lastName, 'lastName') : () => {}}
                messageError={validate.lastName}
                height="h-14"
                border="border-[1px]"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-start items-start w-full my-2">
          <div className="mb-4 h-14 flex items-center w-36">名</div>
          <div className="flex-1 h-20">
            <div className="w-full h-full flex items-start">
              <Input
                name="firstName"
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                validate={firstName ? () => checkValidateName(firstName, 'firstName') : () => {}}
                messageError={validate.firstName}
                height="h-14"
                border="border-[1px]"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-start items-start w-full my-2">
          <div className="mb-4 h-14 flex items-center w-36">姓ふりがな</div>
          <div className="flex-1 h-20">
            <div className="w-full h-full flex items-start">
              <Input
                name="lastNameKatakana"
                type="text"
                value={lastNameKatakana}
                onChange={(e) => {
                  setLastNameKatakana(e.target.value);
                }}
                validate={lastNameKatakana ? () => checkValidateNameKatakana(lastNameKatakana, 'lastName') : () => {}}
                messageError={validate.lastNameKatakana}
                height="h-14"
                border="border-[1px]"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-start items-start w-full my-2">
          <div className="mb-4 h-14 flex items-center w-36">名ふりがな</div>
          <div className="flex-1 h-20">
            <div className="w-full h-full flex items-start">
              <Input
                name="firstNameKatakana"
                type="text"
                value={firstNameKatakana}
                onChange={(e) => {
                  setFirstNameKatakana(e.target.value);
                }}
                validate={
                  firstNameKatakana ? () => checkValidateNameKatakana(firstNameKatakana, 'firstName') : () => {}
                }
                messageError={validate.firstNameKatakana}
                height="h-14"
                border="border-[1px]"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-start items-start w-full my-2">
          <div className="mb-4 h-14 flex items-center w-36">メールアドレス</div>
          <div className="flex-1 h-20">
            <div className="w-full h-full flex items-start">
              <Input
                name="email"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                validate={email ? () => checkValidateEmail(email) : () => {}}
                messageError={validate.email}
                height="h-14"
                border="border-[1px]"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-start items-start w-full my-2">
          <div className="mb-4 h-14 flex items-center w-36">電話番号</div>
          <div className="flex-1 h-20">
            <div className="w-full h-full flex items-start">
              <Input
                name="phone"
                type="text"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                validate={phone ? () => checkValidateTel(phone) : () => {}}
                messageError={validate.phone}
                height="h-14"
                border="border-[1px]"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-around">
          <div className="w-5/12">
            <Button onClick={handleSubmit} classname="bg-primary" isLoading={isLoading}>
              更新
            </Button>
          </div>
          <div className="w-5/12">
            <Button onClick={() => setModalCreate(false)} classname="bg-secondary">
              戻る
            </Button>
          </div>
        </div>
      </div>
    </div>
  </CardLayout>
);
