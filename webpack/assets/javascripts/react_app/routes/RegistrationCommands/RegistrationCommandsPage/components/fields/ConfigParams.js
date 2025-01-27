import React from 'react';
import PropTypes from 'prop-types';

import {
  FormGroup,
  FormSelectOption,
  FormSelect,
} from '@patternfly/react-core';
import LabelIcon from '../../../../../components/common/LabelIcon';

import { translate as __ } from '../../../../../common/I18n';

const ConfigParams = ({
  configParams,
  setupRemoteExecution,
  setupInsights,
  setupInsightsInventory,
  handleRemoteExecution,
  handleInsights,
  handleInsightsInventory,
  isLoading,
}) => {
  const options = (value = '') => {
    const defaultValue = value ? __('yes') : __('no');
    const defaultLabel = `${__(
      'Inherit from host parameter'
    )} (${defaultValue})`;

    return (
      <>
        <FormSelectOption key={0} value="" label={defaultLabel} />
        <FormSelectOption key={1} value label={__('Yes (override)')} />
        <FormSelectOption key={2} value={false} label={__('No (override)')} />
      </>
    );
  };

  return (
    <>
      <FormGroup
        label={__('Setup REX')}
        labelIcon={
          <LabelIcon
            text={__(
              'Setup remote execution. If set to `Yes`, SSH keys will be installed on the registered host. The inherited value is based on the `host_registration_remote_execution` parameter. It can be inherited e.g. from host group, operating system, organization. When overridden, the selected value will be stored on host parameter level.'
            )}
          />
        }
        fieldId="registration_setup_remote_execution"
      >
        <FormSelect
          ouiaId="registration_setup_remote_execution"
          value={setupRemoteExecution}
          onChange={v => handleRemoteExecution(v)}
          className="without_select2"
          id="registration_setup_remote_execution"
          isDisabled={isLoading}
          isRequired
        >
          {/* eslint-disable-next-line camelcase */
          options(configParams?.host_registration_remote_execution)}
        </FormSelect>
      </FormGroup>
      <FormGroup
        label={__('Setup Insights')}
        fieldId="registration_setup_insights"
        labelIcon={
          <LabelIcon
            text={__(
              'If set to `Yes`, Insights client will be installed and registered on Red Hat family operating systems. It has no effect on other OS families that do not support it. The inherited value is based on the `host_registration_insights` parameter. It can be inherited e.g. from host group, operating system, organization. When overridden, the selected value will be stored on host parameter level.'
            )}
          />
        }
      >
        <FormSelect
          ouiaId="registration_setup_insights"
          value={setupInsights}
          onChange={v => handleInsights(v)}
          className="without_select2"
          id="registration_setup_insights"
          isDisabled={isLoading}
          isRequired
        >
          {/* eslint-disable-next-line camelcase */
          options(configParams?.host_registration_insights)}
        </FormSelect>
      </FormGroup>
      <FormGroup
        label={__('Setup Insights Inventory')}
        fieldId="registration_setup_insights_inventory"
        labelIcon={
          <LabelIcon
            text={__(
              'If set to `Yes`, Insights data about this host will be included in the scheduled report generation and upload or via a manual run of the action. The inherited value is based on the `host_registraton_insights_inventory` parameter. It can be inherited e.g. from host group, operating system, organization. When overridden, the selected value will be stored on host parameter level.'
            )}
          />
        }
      >
        <FormSelect
          ouiaId="registration_setup_insights_inventory"
          value={setupInsightsInventory}
          onChange={v => handleInsightsInventory(v)}
          className="without_select2"
          id="registration_setup_insights_inventory"
          isDisabled={isLoading}
          isRequired
        >
          {/* eslint-disable-next-line camelcase */
          options(configParams?.host_registraton_insights_inventory)}
        </FormSelect>
      </FormGroup>
    </>
  );
};

ConfigParams.propTypes = {
  configParams: PropTypes.object,
  setupRemoteExecution: PropTypes.string.isRequired,
  setupInsights: PropTypes.string.isRequired,
  setupInsightsInventory: PropTypes.string.isRequired,
  handleRemoteExecution: PropTypes.func.isRequired,
  handleInsights: PropTypes.func.isRequired,
  handleInsightsInventory: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

ConfigParams.defaultProps = {
  configParams: {},
};

export default ConfigParams;
