import React from 'react';
import PropTypes from 'prop-types';
import { propsToCamelCase } from 'foremanReact/common/helpers';
import { translate as __ } from 'foremanReact/common/I18n';
import {
  DescriptionList,
  DescriptionListTerm,
  DescriptionListGroup,
  DescriptionListDescription,
  Text,
  TextVariants,
} from '@patternfly/react-core';
import CardTemplate from 'foremanReact/components/HostDetails/Templates/CardItem/CardTemplate';
// import { TranslatedPlural } from '../../../Table/components/TranslatedPlural';

const HostDisks = ({ totalDisks }) => {
  if (!totalDisks) return null;
  return (
    <>
      <DescriptionListTerm>{__('Storage')}</DescriptionListTerm>
      <Text component={TextVariants.h4} ouiaId="storage-text">
      </Text>
    </>
  );
};

HostDisks.propTypes = {
  totalDisks: PropTypes.number,
};

HostDisks.defaultProps = {
  totalDisks: null,
};

const HwPropertiesCard = ({ isExpandedGlobal, hostDetails }) => {
  const { facts } = hostDetails || {};
  const model = facts?.['virt::host_type'];
  const reportedFacts = propsToCamelCase(hostDetails?.reported_data || {});
  const cpuCount = reportedFacts?.cpus;
  const cpuSockets = reportedFacts?.sockets;
  const coreSocket = reportedFacts?.cores;
  const totalDisks = reportedFacts?.disksTotal;
  const memory = reportedFacts?.ram;

  console.log(coreSocket)
  console.log(cpuSockets)

  return (
    <CardTemplate
      header={__('HW properties')}
      expandable
      isExpandedGlobal={isExpandedGlobal}
      masonryLayout
    >
      <DescriptionList isHorizontal>
        <DescriptionListGroup>
          <DescriptionListTerm>{__('Model')}</DescriptionListTerm>
          <DescriptionListDescription>{model}</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>{__('Number of CPU(s)')}</DescriptionListTerm>
          <DescriptionListDescription>{cpuCount}</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>{__('Sockets')}</DescriptionListTerm>
          <DescriptionListDescription>{cpuSockets}</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>{__('Cores per socket')}</DescriptionListTerm>
          <DescriptionListDescription>{coreSocket}</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>{__('RAM')}</DescriptionListTerm>
          <DescriptionListDescription>{memory}</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <HostDisks totalDisks={totalDisks} />
        </DescriptionListGroup>
      </DescriptionList>
    </CardTemplate>
  );
};

HwPropertiesCard.propTypes = {
  isExpandedGlobal: PropTypes.bool,
  hostDetails: PropTypes.shape({
    facts: PropTypes.shape({
      model: PropTypes.string,
      cpuCount: PropTypes.number,
      cpuSockets: PropTypes.number,
      coreSocket: PropTypes.number,
      memory: PropTypes.string,
    }),
    reported_data: PropTypes.shape({
      totalDisks: PropTypes.number,
    }),
  }),
};

HwPropertiesCard.defaultProps = {
  isExpandedGlobal: false,
  hostDetails: {},
};

export default HwPropertiesCard;
