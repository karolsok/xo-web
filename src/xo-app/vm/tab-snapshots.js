import _ from 'messages'
import Icon from 'icon'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import React from 'react'
import xo from 'xo'
import { FormattedRelative, FormattedTime } from 'react-intl'
import { Row, Col } from 'grid'
import { Text } from 'editable'

export default ({
  snapshots
}) => <div>
  {isEmpty(snapshots)
    ? <Row>
      <Col smallSize={6} className='text-xs-center'>
        <br/>
        <h4>{_('noSnapshot')}</h4>
        <p><em><Icon icon='info' size={1} /> {_('tipLabel')} {_('tipCreateSnapshotLabel')}</em></p>
      </Col>
      <Col smallSize={6} className='text-xs-center'>
        <p><button type='button' className='btn btn-lg btn-secondary btn-huge'><Icon icon='vm-snapshot' size={1} /> </button></p>
      </Col>
    </Row>
    : [<Row>
      <Col smallSize={12}>
        <button className='btn btn-lg btn-primary btn-tab'>
          <Icon icon='add-tag' size={1} /> {_('snapshotCreateButton')}
        </button>
        <br/>
        <table className='table'>
          <thead className='thead-default'>
            <tr>
              <th>{_('snapshotDate')}</th>
              <th>{_('snapshotName')}</th>
              <th>{_('snapshotAction')}</th>
            </tr>
          </thead>
          <tbody>
            {map(snapshots, (snapshot) =>
              <tr key={snapshot.id}>
                <td><FormattedTime value={snapshot.snapshot_time * 1000} minute='numeric' hour='numeric' day='numeric' month='long' year='numeric'/> (<FormattedRelative value={snapshot.snapshot_time * 1000}/>)</td>
                <td>
                  <Text onChange={(value) => xo.call('vm.set', { id: snapshot.id, name_label: value })}>
                    {snapshot.name_label}
                  </Text>
                </td>
                <td><i className='xo-icon-export xo-icon-action-row'></i> <i className='xo-icon-snapshot-revert xo-icon-action-row'></i> <i className='xo-icon-snapshot-delete xo-icon-action-row'></i></td>
              </tr>
            )}
          </tbody>
        </table>
      </Col>
    </Row>]
  }
</div>
