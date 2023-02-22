"use client";

import CardLayout from "@/components/CardLayout";
import { SelectCompany } from "@/components/Select";
import { Role } from "@/utils/constants";
import { useEffect, useMemo, useState } from "react";
import { css, cx } from "@emotion/css";
import { Input } from "@/components/Input";
import Link from "next/link";
import Table from "@/components/Table";
import Pagination from "@/components/Table/pagination";
import {
  DeleteFilled,
  EditFilled,
  EyeOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import ModalDeleted from "@/components/Modal";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
  ModalCreateCompany,
  ModalCreateCompanyByFile,
  ModalResultFileExport,
} from "@/components/Modal/CreateCompany";
import {
  validateGender,
  validateName,
  validateTelPhone,
} from "@/utils/validate";

export default function CompanyPage() {
  const [listCompany, setListCompany] = useState([]);
  const [company, setCompany] = useState();
  const [numberPhone, setNumberPhone] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [activeItem, setActiveItem] = useState();
  const handleSearch = async () => {
    const params = { sortType: "ASC", page: currentPage, size: 20 };
    if (company?.name) {
      params.name = company.name;
    }
    if (numberPhone !== "") {
      params.phoneNumber = numberPhone.trim();
    }
    const [res] = await handleApi(listCompanyAPI(params));
    if (res) {
      setListCompany(res.data.result);
      setLastPage(res.data.lastPage);
      setTotal(res.data.total);
      setCurrentPage(1);
    }
  };
  const columns = useMemo(
    () => [
      {
        title: "会社番号",
        index: "id",
        render: (id) => <div className="w-full text-left">{id}</div>,
        className: "min-w-[40px]",
        sorter: (a, b) => a - b,
      },
      {
        title: "会社名",
        index: "company_name",
        render: (name) => <div className="w-full text-left">{name}</div>,
        className: "max-w-[200px] 3xl:max-w-[240px] 4xl:max-w-[280px]",
        sorter: (a, b) => a.localeCompare(b),
      },
      {
        title: "ユーザーの名前",
        index: "owner_name",
        render: (value) => <div className="w-full text-left">{value}</div>,
        className: "max-w-[200px] 3xl:max-w-[240px] 4xl:max-w-[280px]",
        sorter: (a, b) => a.localeCompare(b),
      },
      {
        title: "メールアドレス",
        index: "email",
        render: (value) => <div className="w-full text-left">{value}</div>,
        className: "max-w-[150px] 3xl:max-w-[190px] 4xl:max-w-[220px]",
        sorter: (a, b) => a.localeCompare(b),
      },
      {
        title: "アクション",
        index: "id",
        render: (id, record) => (
          <div className="w-full flex justify-center items-center">
            <Link href={`/admin/company/edit/${id}`}>
              <EditFilled
                className={cx(
                  "w-6 h-6 mx-2 text-primary",
                  css`
                    svg {
                      width: 100%;
                      height: 100%;
                    }
                  `
                )}
              />
            </Link>
            <Link href={`/admin/company/employee/${id}`}>
              <EyeOutlined
                className={cx(
                  "w-6 h-6 mx-2 text-primary",
                  css`
                    svg {
                      width: 100%;
                      height: 100%;
                    }
                  `
                )}
              />
            </Link>
            <div
              className="hover:cursor-pointer"
              onClick={() => {
                setModalCreate(true), setEnterpriseId(id);
              }}
            >
              <UserAddOutlined
                className={cx(
                  "w-6 h-6 mx-2 text-primary",
                  css`
                    svg {
                      width: 100%;
                      height: 100%;
                    }
                  `
                )}
              />
            </div>
            <div
              className="hover:cursor-pointer"
              onClick={() => {
                setModalCreateByFile(true), setEnterpriseId(id);
              }}
            >
              <UsergroupAddOutlined
                className={cx(
                  "w-6 h-6 mx-2 text-primary",
                  css`
                    svg {
                      width: 100%;
                      height: 100%;
                    }
                  `
                )}
              />
            </div>
            {user.role === Role.admin && (
              <DeleteFilled
                className={cx(
                  "w-6 h-6 mx-2 text-error",
                  css`
                    svg {
                      width: 100%;
                      height: 100%;
                    }
                  `
                )}
                onClick={() =>
                  setActiveItem({
                    id: record._id,
                    name: record.company_name,
                    data: [
                      {
                        label: "会社名",
                        value: record.company_name,
                      },
                      {
                        label: "ユーザーの名前",
                        value: record.owner_name,
                      },
                      {
                        label: "メールアドレス",
                        value: record.email,
                      },
                    ],
                  })
                }
              />
            )}
          </div>
        ),
        className: "w-[8%]",
      },
    ],
    []
  );
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/enterprise/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            accessToken: token,
          },
        }
      );
      const data = await response.json();
      if (data.status === "failure") {
        enqueueSnackbar(data.message, {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        return;
      } else if (data.status === "success") {
        setActiveItem();
        const item = listCompany.find((d) => d.id === id);
        const index = listCompany.indexOf(item);
        listCompany.splice(index, 1);
        enqueueSnackbar("Delete company successful", {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    } catch (error) {
      enqueueSnackbar("Delete company failed", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      console.log(error);
    }
  };

  useEffect(() => {
    const getListCompany = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/enterprise`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              accessToken: token,
            },
          }
        );
        const data = await response.json();
        if (data.status === "failure") {
          return;
        } else if (data.status === "success") {
          setListCompany(data?.payload?.enterpriseAll);
        }
      } catch (error) {
        throw error;
      }
    };
    getListCompany();
  }, [currentPage]);
  const { user } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useSelector((state) => state.user);
  const [modalCreate, setModalCreate] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [numberOfEmployees, setNumberOfEmployees] = useState("");
  const [gender, setGender] = useState("");
  const [enterpriseId, setEnterpriseId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validate, setValidate] = useState({
    name: "",
    phone: "",
    gender: "",
  });
  const checkValidateName = (name, type) => {
    const checkValidateFullName = validateName(name, type);
    setValidate({ ...validate, name: checkValidateFullName });
  };
  const checkValidateTel = () => {
    const checkValidateTel = validateTelPhone(phone);
    setValidate({ ...validate, tel: checkValidateTel });
  };
  const checkValidateGender = () => {
    const checkValidateGender = validateGender(gender);
    setValidate({ ...validate, gender: checkValidateGender });
  };
  const [modalCreateByFile, setModalCreateByFile] = useState(false);
  const handleChangeFileInput = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmitFile = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("id", enterpriseId);
    formData.append("file", file);
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/enterprise/employee/xlsx`,
        {
          method: "POST",
          headers: {
            accessToken: token,
          },
          body: formData,
        }
      );
      const data = await response.json();
      setIsLoading(false);
      if (data.status === "failure") {
        enqueueSnackbar(data.message, {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        return;
      } else if (data.status === "success") {
        setSuccessList(data?.payload?.User_Success);
        setFailList(data?.payload?.User_Failure);
        setErrorMessage(data?.payload?.User_Failure[0]?.message);
        setModalCreateByFile(false);
        setModalResultFileExport(true);
      }
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar("Import users from file failed", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      throw error;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validateEmployeeName = validateName(name, "firstName");
    const validateEmployeeTel = validateTelPhone(phone);
    const validateEmployeeGender = validateGender(gender);
    console.log(validateEmployeeTel);
    if (
      !validateEmployeeName &&
      !validateEmployeeTel &&
      !validateEmployeeGender
    ) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/enterprise/employee/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              accessToken: token,
            },
            body: JSON.stringify({
              name: name,
              phone: phone,
              number_of_employee: numberOfEmployees,
              gender: gender,
              enterprise_id: enterpriseId,
              password: password,
            }),
          }
        );
        const data = await response.json();
        setIsLoading(false);
        if (data.status === "failure") {
          enqueueSnackbar(data.message, {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          return;
        } else if (data.status === "success") {
          enqueueSnackbar("Create user successful", {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        }
      } catch (error) {
        setIsLoading(false);
        enqueueSnackbar("Create user failed", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        throw error;
      }
    } else {
      setValidate({
        name: validateEmployeeName,
        phone: validateEmployeeTel,
        gender: validateEmployeeGender,
      });
    }
  };
  const [file, setFile] = useState();
  const [successList, setSuccessList] = useState();
  const [failList, setFailList] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [modalResultFileExport, setModalResultFileExport] = useState(false);

  return (
    <div className="w-full">
      <div className="w-full h-10 flex justify-center items-center text-3xl mt-4">
        会社一覧
      </div>
      {modalCreate && (
        <ModalCreateCompany
          validate={validate}
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          numberOfEmployees={numberOfEmployees}
          setNumberOfEmployees={setNumberOfEmployees}
          gender={gender}
          setGender={setGender}
          enterpriseId={enterpriseId}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          setModalCreate={setModalCreate}
          checkValidateName={checkValidateName}
          checkValidateTel={checkValidateTel}
          checkValidateGender={checkValidateGender}
        />
      )}

      {modalCreateByFile && (
        <ModalCreateCompanyByFile
          handleSubmitFile={handleSubmitFile}
          setModalCreateByFile={setModalCreateByFile}
          enterpriseId={enterpriseId}
          handleChangeFileInput={handleChangeFileInput}
          isLoading={isLoading}
        />
      )}

      {!modalCreate && !modalCreateByFile && !modalResultFileExport && (
        <CardLayout>
          <div className="flex justify-start mt-8">
            {user.role === Role.admin && (
              <div className="w-1/3 px-6 flex pb-4">
                <div className="mr-6 mb-4 h-12 leading-[48px] w-16">会社名</div>
                <div
                  className={css`
                    width: calc(100% - 90px);
                  `}
                >
                  <SelectCompany
                    value={company}
                    setValue={setCompany}
                    height="h-12"
                  />
                </div>
              </div>
            )}
            <div className="w-1/3 flex justify-start items-start px-6">
              <div className="mr-6 mb-4 h-12 flex items-center w-16">
                電話番号
              </div>
              <div className="flex-1 h-20">
                <div className="w-full h-full flex items-start">
                  <Input
                    name="number_phone"
                    type="text"
                    value={numberPhone}
                    onChange={(e) => {
                      setNumberPhone(e.target.value);
                    }}
                    height="h-12"
                    border="border-[1px]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-start px-6 pb-6">
            <div
              className="h-12 w-36 bg-primary flex justify-center items-center rounded-md text-white cursor-pointer mr-4"
              onClick={handleSearch}
            >
              検索
            </div>
            {user.role === Role.admin && (
              <Link href="/admin/company/create">
                <div className="h-12 w-36 bg-primary flex justify-center items-center rounded-md text-white cursor-pointer mr-4">
                  会社登録
                </div>
              </Link>
            )}
          </div>
          <Table columns={columns} data={listCompany} />
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            setCurrentPage={setCurrentPage}
            total={total}
          />
        </CardLayout>
      )}
      {activeItem?.id && (
        <ModalDeleted
          action={handleDelete}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      )}
      {modalResultFileExport && (
        <ModalResultFileExport
          successList={successList}
          failList={failList}
          errorMessage={errorMessage}
          setModalResultFileExport={setModalResultFileExport}
        />
      )}
    </div>
  );
}