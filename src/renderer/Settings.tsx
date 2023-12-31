import '@arco-design/web-react/dist/css/arco.css';
import { useState } from 'react';
import {
    Grid,
    Input,
    Select,
    Drawer,
    Form,
    Switch,
    Radio,
} from '@arco-design/web-react';
import { useTranslation } from 'react-i18next';

const { Row } = Grid;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

/* eslint-disable import/prefer-default-export */
export function Settings(props: {
    showSettings: boolean;
    onCancel: () => void;
}) {
    const { showSettings, onCancel } = props;
    const [model, setModel] = useState<string>();
    const [autoStart, setAutoStart] = useState<boolean>();
    const [apiKey, setAPIKey] = useState<string>();
    const [apiDomain, setAPIDomain] = useState<string>();
    const [shortcut, setShortcut] = useState<string>();
    const [shortcutPrefix, setShortcutPrefix] = useState<string>();
    const [runInBackground, setRunInBackground] = useState<boolean>();
    const { t } = useTranslation();

    let shortcutPrefixOptions = [
        {
            value: 'alt',
            label: 'Alt',
        },
        {
            value: 'ctrl',
            label: 'Ctrl',
        },
        {
            value: 'shift',
            label: 'Shift',
        },
        {
            value: 'win',
            label: 'Win',
        },
    ];
    if (window.electron.platform === 'darwin') {
        shortcutPrefixOptions = [
            {
                value: 'option',
                label: 'Opt',
            },
            {
                value: 'ctrl',
                label: 'Ctrl',
            },
            {
                value: 'shift',
                label: 'Shift',
            },
            {
                value: 'command',
                label: 'Cmd',
            },
        ];
    }
    const shortcutOptions = [
        { value: '1', key: '1' },
        { value: '2', key: '2' },
        { value: '3', key: '3' },
        { value: '4', key: '4' },
        { value: '5', key: '5' },
        { value: '6', key: '6' },
        { value: '7', key: '7' },
        { value: '8', key: '8' },
        { value: '9', key: '9' },
        { value: '0', key: '0' },
        { value: '-', key: '-' },
        { value: '=', key: '=' },
        { value: 'tab', key: 'TAB' },
        { value: 'q', key: 'Q' },
        { value: 'w', key: 'W' },
        { value: 'e', key: 'E' },
        { value: 'r', key: 'R' },
        { value: 't', key: 'T' },
        { value: 'y', key: 'Y' },
        { value: 'u', key: 'U' },
        { value: 'i', key: 'I' },
        { value: 'o', key: 'O' },
        { value: 'p', key: 'P' },
        { value: '[', key: '[' },
        { value: ']', key: ']' },
        { value: 'a', key: 'A' },
        { value: 's', key: 'S' },
        { value: 'd', key: 'D' },
        { value: 'f', key: 'F' },
        { value: 'g', key: 'G' },
        { value: 'h', key: 'H' },
        { value: 'j', key: 'J' },
        { value: 'k', key: 'K' },
        { value: 'l', key: 'L' },
        { value: ';', key: ';' },
        { value: "'", key: "'" },
        { value: 'z', key: 'Z' },
        { value: 'x', key: 'X' },
        { value: 'c', key: 'C' },
        { value: 'v', key: 'V' },
        { value: 'b', key: 'B' },
        { value: 'n', key: 'N' },
        { value: 'm', key: 'M' },
        { value: ',', key: ',' },
        { value: '.', key: '.' },
        { value: '/', key: '/' },
    ];

    return (
        <div>
            <Drawer
                width={500}
                title={<span>{t('settings.title')}</span>}
                footer
                visible={showSettings}
                onCancel={onCancel}
                afterOpen={() => {
                    window.electron.ipcRenderer.once('settings', (arg: any) => {
                        setAutoStart(arg[0]);
                        setRunInBackground(arg[1]);
                        setModel(arg[2]);
                        setAPIKey(arg[3]);
                        setAPIDomain(arg[4]);
                        setShortcutPrefix(arg[5]);
                        setShortcut(arg[6]);
                    });
                    window.electron.ipcRenderer.sendMessage('settings', [
                        'get',
                        [
                            'auto_start',
                            'run_in_background',
                            'model',
                            'api_key',
                            'api_domain',
                            'shortcut_prefix',
                            'shortcut',
                        ],
                    ]);
                }}
                afterClose={() => {
                    window.electron.ipcRenderer.sendMessage('settings', [
                        'set',
                        ['auto_start', autoStart],
                    ]);
                    window.electron.ipcRenderer.sendMessage('settings', [
                        'set',
                        ['run_in_background', runInBackground],
                    ]);
                    window.electron.ipcRenderer.sendMessage('settings', [
                        'set',
                        ['model', model],
                    ]);
                    window.electron.ipcRenderer.sendMessage('settings', [
                        'set',
                        ['api_key', apiKey],
                    ]);
                    window.electron.ipcRenderer.sendMessage('settings', [
                        'set',
                        ['api_domain', apiDomain],
                    ]);
                    window.electron.ipcRenderer.sendMessage('settings', [
                        'set',
                        ['shortcut_prefix', shortcutPrefix],
                    ]);
                    window.electron.ipcRenderer.sendMessage('settings', [
                        'set',
                        ['shortcut', shortcut],
                    ]);
                }}
            >
                <Row>
                    <Form
                        layout="vertical"
                        style={{ width: 450 }}
                        autoComplete="off"
                    >
                        <FormItem
                            label={t('settings.auto_start')}
                            field="autostart"
                        >
                            <Switch
                                checked={autoStart}
                                onChange={(value) => {
                                    setAutoStart(value);
                                }}
                            />
                        </FormItem>
                        <FormItem
                            label={t('settings.run_in_background')}
                            field="runInBackground"
                        >
                            <Switch
                                checked={runInBackground}
                                onChange={(value) => {
                                    setRunInBackground(value);
                                }}
                            />
                        </FormItem>
                        <FormItem label={t('settings.shortcut')}>
                            <Grid.Row>
                                <Grid.Col span={12}>
                                    <RadioGroup
                                        options={shortcutPrefixOptions}
                                        size="default"
                                        type="button"
                                        value={shortcutPrefix}
                                        style={{ marginBottom: 20 }}
                                        onChange={(value) => {
                                            setShortcutPrefix(value);
                                        }}
                                    />
                                </Grid.Col>
                                <Grid.Col span={1}>+</Grid.Col>
                                <Grid.Col span={4}>
                                    <Select
                                        value={shortcut}
                                        onChange={(value) => {
                                            setShortcut(value);
                                        }}
                                        showSearch
                                    >
                                        {shortcutOptions.map((item) => (
                                            <Select.Option
                                                value={item.value}
                                                key={item.value}
                                            >
                                                {item.key}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Grid.Col>
                            </Grid.Row>
                        </FormItem>
                        <FormItem
                            label={t('settings.api_key')}
                            extra={
                                <div>
                                    <a href="https://platform.openai.com/account/api-keys">
                                        {t('settings.click_here')}
                                    </a>
                                    <span> </span>
                                    {t('settings.generate_api_key')}
                                </div>
                            }
                        >
                            <Input.Password
                                placeholder={t<string>(
                                    'settings.api_key_placeholder'
                                )}
                                defaultVisibility={false}
                                value={apiKey}
                                onChange={(value) => {
                                    setAPIKey(value);
                                }}
                            />
                        </FormItem>
                        <FormItem label={t('settings.api_domain')}>
                            <Input
                                placeholder={t<string>(
                                    'settings.api_domain_placeholder'
                                )}
                                value={apiDomain}
                                onChange={(value) => {
                                    setAPIDomain(value);
                                }}
                            />
                        </FormItem>
                        <FormItem label={t('settings.model')}>
                            <Select
                                value={model}
                                options={[
                                    {
                                        label: 'gpt-4-32k-0314',
                                        value: 'gpt-4-32k-0314',
                                    },
                                    {
                                        label: 'gpt-4-32k',
                                        value: 'gpt-4-32k',
                                    },

                                    {
                                        label: 'gpt-4-0314',
                                        value: 'gpt-4-0314',
                                    },
                                    {
                                        label: 'gpt-4',
                                        value: 'gpt-4',
                                    },
                                    {
                                        label: 'gpt-3.5-turbo-0301',
                                        value: 'gpt-3.5-turbo-0301',
                                    },
                                    {
                                        label: 'gpt-3.5-turbo',
                                        value: 'gpt-3.5-turbo',
                                    },
                                ]}
                                allowClear
                                onChange={(value) => {
                                    setModel(value);
                                }}
                            />
                        </FormItem>
                    </Form>
                </Row>
            </Drawer>
        </div>
    );
}
