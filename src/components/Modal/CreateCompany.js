import { Button } from '../Button/button';
import CardLayout from '../CardLayout';
import { Input } from '../Input';

export const ModalCreateCompany = ({
  validate,
  name,
  setName,
  setPhone,
  phone,
  numberOfEmployees,
  setNumberOfEmployees,
  gender,
  setGender,
  enterpriseId,
  password,
  setPassword,
  handleSubmit,
  isLoading,
  setModalCreate,
  checkValidateName,
  checkValidateTel,
  checkValidateGender,
}) => (
  <CardLayout>
    <div className="mt-2 w-[60%] mx-auto">
      <h1 className="w-full text-center text-xl xsm:text-3xl text-skyBlue-300 mt-2 mb-4">会社登録</h1>
      <div className="w-full px-4 md:p-6 lg:p-8 xl:p-10">
        <div className="flex justify-start items-start w-full my-2">
          <div className="mb-4 h-14 flex items-center w-36">名</div>
          <div className="flex-1 h-20">
            <div className="w-full h-full flex items-start">
              <Input
                name="name"
                type="text"
                value={name}
                label="メールアドレス"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                validate={name ? () => checkValidateName(name, 'firstName') : () => {}}
                messageError={validate.name}
                height="h-14"
                border="border-[1px]"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-start items-start w-full my-2">
          <div className="mb-4 h-14 flex items-center w-36">携帯電話番号</div>
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
        <div className="flex justify-start items-start w-full my-2">
          <div className="mb-4 h-14 flex items-center w-36">社員番号</div>
          <div className="flex-1 h-20">
            <div className="w-full h-full flex items-start">
              <Input
                name="numberOfEmployees"
                type="text"
                value={numberOfEmployees}
                onChange={(e) => {
                  setNumberOfEmployees(e.target.value);
                }}
                height="h-14"
                border="border-[1px]"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-start items-start w-full my-2">
          <div className="mb-4 h-14 flex items-center w-36">性 別</div>
          <div className="flex-1 h-20">
            <div className="w-full h-full flex items-start">
              <Input
                name="gender"
                type="text"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                validate={gender ? () => checkValidateGender(gender) : () => {}}
                messageError={validate.gender}
                height="h-14"
                border="border-[1px]"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-start items-start w-full my-2">
          <div className="mb-4 h-14 flex items-center w-36">会社番号</div>
          <div className="flex-1 h-20">
            <div className="w-full h-full flex items-start">
              <Input
                name="enterpriseId"
                type="text"
                value={enterpriseId}
                disabled
                height="h-14"
                border="border-[1px]"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-start items-start w-full my-2">
          <div className="mb-4 h-14 flex items-center w-36">暗証番号</div>
          <div className="flex-1 h-20">
            <div className="w-full h-full flex items-start">
              <Input
                name="password"
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                messageError={validate.password}
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

export const ModalCreateCompanyByFile = ({
  handleSubmitFile,
  setModalCreateByFile,
  enterpriseId,
  handleChangeFileInput,
  isLoading,
}) => (
  <CardLayout>
    <div className="mt-2 w-[60%] mx-auto">
      <h1 className="w-full text-center text-xl xsm:text-3xl text-skyBlue-300 mt-2 mb-4">会社登録</h1>
      <div className="w-full px-4 md:p-6 lg:p-8 xl:p-10">
        <div className="flex justify-start items-start w-full my-2">
          <div className="mb-4 h-14 flex items-center w-36">会社番号</div>
          <div className="flex-1 h-20">
            <div className="w-full h-full flex items-start">
              <Input
                name="enterpriseId"
                type="text"
                value={enterpriseId}
                disabled
                height="h-14"
                border="border-[1px]"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-start items-start w-full my-2">
          <div className="mb-4 h-14 flex items-center w-36">ファイル</div>
          <div className="flex-1 h-20">
            <div className="w-full h-full flex items-start">
              <input
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleChangeFileInput}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-around">
          <div className="w-5/12">
            <Button onClick={handleSubmitFile} classname="bg-primary" isLoading={isLoading}>
              更新
            </Button>
          </div>
          <div className="w-5/12">
            <Button onClick={() => setModalCreateByFile(false)} classname="bg-secondary">
              戻る
            </Button>
          </div>
        </div>
      </div>
    </div>
  </CardLayout>
);

export const ModalResultFileExport = ({ successList, failList, errorMessage, setModalResultFileExport }) => (
  <CardLayout>
    <div className="mt-2 w-[60%] mx-auto">
      <div className="w-full px-4 md:p-6 lg:p-8 xl:p-10">
        <div className="text-xl">
          <div className="flex justify-start items-start w-full">
            <span className="text-primary font-bold">成功</span>:&nbsp;
            {successList?.length}
          </div>
          {failList.length > 0 && (
            <div className="flex flex-col justify-start items-start w-full">
              <div>
                <div className="bg-third h-1 my-4"></div>
                <span className="text-error font-bold">失敗</span>:&nbsp;
                {failList?.length}
                <p className="font-bold text-error">
                  メッセージエラー:&nbsp;
                  <span className="italic">{errorMessage}</span>
                </p>
              </div>
              <span className="font-bold text-error">電話番号リスト失敗:</span>
              <div className="overflow-scroll w-full max-h-[50vh]">
                {failList?.map((item, index) => (
                  <li key={index}>{item?.data?.phone}&nbsp;</li>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="w-full flex justify-around mt-2">
          <div className="w-5/12">
            <Button onClick={() => setModalResultFileExport(false)} classname="bg-primary">
              クローズ
            </Button>
          </div>
        </div>
      </div>
    </div>
  </CardLayout>
);
