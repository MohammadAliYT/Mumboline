// Inputs used in our app and their variants.

import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, PlusIcon } from "@heroicons/react/solid";

import { Icon } from "@iconify/react";
import eyeLine from "@iconify-icons/clarity/eye-line";

import "./_input.scss";

export function InputPassword(props) {
  let { placeholder, InputIcon, setValue } = props;
  let [showPassword, setShowPassword] = useState(false);

  let onChange = (e) => {
    setValue(e.target.value);
  };

  InputPassword.propTypes = {
    placeholder: PropTypes.string,
    InputIcon: PropTypes.any,
    setValue: PropTypes.func,
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        className="input__dash text-gray font-sans text-sm h-12 w-full rounded-5xl outline-none px-14"
        placeholder={placeholder}
        onChange={onChange}
      />
      {InputIcon}
      <Icon
        icon={eyeLine}
        width={"1.5rem"}
        height={"1.5rem"}
        color={"#686868"}
        className="absolute top-3 left-full -ml-11"
        onClick={() => setShowPassword(!showPassword)}
      />
    </div>
  );
}

export default function Input(props) {
  let { placeholder, InputIcon, className, setValue, type, value } = props;

  let onChange = (e) => {
    setValue(e.target.value);
  };

  Input.propTypes = {
    placeholder: PropTypes.string,
    InputIcon: PropTypes.any,
    className: PropTypes.string,
    type: PropTypes.string,
    setValue: PropTypes.func,
    value: PropTypes.string,
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type={type ? type : "text"}
        className="input__dash text-gray font-sans text-sm h-12 w-full rounded-5xl outline-none px-14"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {InputIcon}
    </div>
  );
}

// Input no Paddings, till I make a proper refactoring
export function InputNP(props) {
  let { placeholder, value, InputIcon, className, setValue, onKeyDown } = props;

  InputNP.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    InputIcon: PropTypes.any,
    className: PropTypes.string,
    setValue: PropTypes.func,
    onKeyDown: PropTypes.func,
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        className="input__dash text-gray font-sans text-sm h-9 w-full rounded-5xl outline-none pl-5"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        value={value}
      />
      {InputIcon}
    </div>
  );
}

export function InputNPHalf(props) {
  let { placeholder, value, InputIcon, className, setValue, onKeyDown, name } =
    props;

  InputNPHalf.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    InputIcon: PropTypes.any,
    className: PropTypes.string,
    setValue: PropTypes.func,
    onKeyDown: PropTypes.func,
    name: PropTypes.string,
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        className="input__dash text-gray font-sans text-sm h-9 w-full rounded-5xl outline-none pl-5"
        name={name}
        onChange={(e) =>
          setValue((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        value={value}
      />
      {InputIcon}
    </div>
  );
}

export function InputDimmed(props) {
  let { placeholder, value, setValue } = props;

  InputDimmed.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    setValue: PropTypes.func,
  };

  return (
    <input
      type="text"
      className="text-gray text-center font-sans text-sm h-9 pl-2 rounded-5xl outline-none bg-transparent"
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      value={value}
    />
  );
}

// A Dropdown component that displays data from an array of objects
// Has the ability to display a field from an object
// The selected field then ends up having it's parent object selected
// in the context of say MessagingContext or AppContext.
// The consumer of this code passes in a hook function to customize the behavior as he wishes.
// Hook returns: {
//   selected: Object // The selected object
//   setSelected: Function // A function to set the selected object (onChange)
//   dataObj: Object // an Object that contains the data to be displayed
//   dataArrKey: String // Used to access dataObj
//   elementDisplayFieldKey: String // Used to access the selected object's field,
//   // final example: dataObj[dataArrKey][0][elementDisplayFieldKey]
// }
export function Dropdown(props) {
  let { hook, className } = props;

  Dropdown.propTypes = {
    hook: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  const { selected, setSelected, dataObj, dataArrKey, elementDisplayFieldKey } =
    hook();

  return (
    <div className={className ? className : ""}>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-btn-gray text-gray rounded-5xl btn-shadow cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate text-sm font-sans">
              {selected[elementDisplayFieldKey]}
            </span>
            <span className="absolute inset-y-3 right-2 flex items-center pr-2 pointer-events-none arrow w-5 h-5"></span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
              {dataObj[dataArrKey].map((element, i) => (
                <Listbox.Option
                  key={i}
                  className={({ active }) =>
                    `${active ? "text-amber-900 bg-amber-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={element}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {element[elementDisplayFieldKey]}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? "text-amber-600" : "text-amber-600"
                          }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export function SelectElement({ data = [], selected, setSelected }) {
  SelectElement.propTypes = {
    data: PropTypes.array,
    selected: PropTypes.string,
    setSelected: PropTypes.func,
  };

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full h-12 py-2 pl-6 text-left bg-btn-gray text-gray rounded-5xl btn-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
          <span className="block truncate text-sm font-sans">
            {selected || "Select"}
          </span>
          <span className="absolute inset-y-4 right-4 flex items-center pr-2 pointer-events-none arrow w-5 h-5"></span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
            <Listbox.Option className="text-gray-900 bg-gray-100 relative py-2 pl-10 pr-4">
              <>
                <span className="font-medium">
                  <a href="/dashboard/verifiedId/" className="block">
                    Add New
                  </a>
                </span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <PlusIcon className="w-5 h-5" aria-hidden="true" />
                </span>
              </>
            </Listbox.Option>
            {data.map(({ email, number }, i) => (
              <Listbox.Option
                key={i}
                className="cursor-pointer hover:bg-gray-100 select-none relative py-2 pl-10 pr-4"
                value={number || email}
              >
                <>
                  <span
                    className={`${
                      number == selected || email == selected
                        ? "font-medium"
                        : "font-normal"
                    }`}
                  >
                    {number || email}
                  </span>
                  {(number == selected || email == selected) && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <CheckIcon className="w-5 h-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
