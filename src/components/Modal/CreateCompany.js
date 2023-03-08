import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Button } from '../Button/button';
import CardLayout from '../CardLayout';
import { Input } from '../Input';

export const ModalCreateCompany = ({
  validate,
  companyName,
  affiliationName,
  setAffiliationName,
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
  numberOfEmployees,
  setNumberOfEmployees,
  handleSubmit,
  isLoading,
  setModalCreate,
  checkValidateTel,
  checkValidateNumberOfEmployee,
  checkValidateEmail,
  checkValidateName,
  checkValidateNameKatakana,
  setValidate
}) => {
  const modalRef = useRef(null);
  const resetForm = () => {
    setAffiliationName('');
    setNumberOfEmployees('');
    setFirstName('');
    setFirstNameKatakana('');
    setLastName('');
    setLastNameKatakana('');
    setEmail('');
    setPhone('');
    setValidate('')
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalCreate(false);
        resetForm();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div ref={modalRef}>
      <CardLayout>
        <div className="mt-2 w-[60%] mx-auto">
          <h1 className="w-full text-center text-xl xsm:text-3xl text-skyBlue-300 mt-2 mb-4">ユーザー登録</h1>
          <div className="w-full px-4 md:p-6 lg:p-8 xl:p-10">
            <div className="flex justify-start items-start w-full my-2">
              <div className="mb-4 h-14 flex items-center w-36">会社名</div>
              <div className="flex-1 h-20">
                <div className="w-full h-full flex items-start">
                  <Input
                    disabled
                    name="companyName"
                    type="text"
                    value={companyName}
                    height="h-14"
                    border="border-[1px]"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-start items-start w-full my-2">
              <div className="mb-4 h-14 flex items-center w-36">部署名</div>
              <div className="flex-1 h-20">
                <div className="w-full h-full flex items-start">
                  <Input
                    name="affiliationName"
                    type="text"
                    value={affiliationName}
                    onChange={(e) => {
                      setAffiliationName(e.target.value);
                    }}
                    validate={affiliationName ? () => checkValidateName(affiliationName, 'departmentName') : () => {}}
                    messageError={validate.departmentName}
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
                    validate={numberOfEmployees ? () => checkValidateNumberOfEmployee(numberOfEmployees) : () => {}}
                    messageError={validate.numberOfEmployees}
                    height="h-14"
                    border="border-[1px]"
                  />
                </div>
              </div>
            </div>
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
                    validate={
                      lastNameKatakana ? () => checkValidateNameKatakana(lastNameKatakana, 'lastName') : () => {}
                    }
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
                <Button
                  onClick={() => {
                    setModalCreate(false);
                    resetForm();
                  }}
                  classname="bg-secondary"
                >
                  戻る
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardLayout>
    </div>
  );
};

export const ModalCreateCompanyByFile = ({
  handleSubmitFile,
  setModalCreateByFile,
  enterpriseId,
  handleChangeFileInput,
  isLoading,
}) => {
  const modalRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalCreateByFile(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div ref={modalRef}>
      <CardLayout>
        <div className="mt-2 w-[60%] mx-auto">
          <h1 className="w-full text-center text-xl xsm:text-3xl text-skyBlue-300 mt-2 mb-4">
            ファイルからのユーザー登録
          </h1>
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
              <div className="w-6/12 mr-2">
                <Link
                  href="/ユーザー一括登録用エクセル_Nerusoku.xlsx"
                  classname="bg-primary w-full h-full block"
                  isLoading={isLoading}
                >
                  <Button classname="bg-primary text-xs whitespace-nowrap">雛形ファイルダウンロード</Button>
                </Link>
              </div>
              <div className="w-3/12 mr-2">
                <Button onClick={handleSubmitFile} classname="bg-primary text-xs" isLoading={isLoading}>
                  更新
                </Button>
              </div>
              <div className="w-3/12">
                <Button onClick={() => setModalCreateByFile(false)} classname="bg-secondary text-xs">
                  戻る
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardLayout>
    </div>
  );
};

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
